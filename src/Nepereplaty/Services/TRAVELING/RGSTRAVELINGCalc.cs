using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.TRAVELINGCaclService;
using Newtonsoft.Json;
using System.Net;
using System.Text;
using System.IO;
using System.Globalization;

namespace Nepereplaty.Services.TRAVELING
{
    public class RGSTRAVELINGCalc : ITRAVELINGCalc
    {
        public InsuracneCompany Company { get; set; }

        public RGSTRAVELINGCalc()
        {
            Company = new InsuracneCompany();
            Company.Id = 2;
            Company.Logo = "/i/partners/rgs.png";
            Company.Name = "РГС";
        }

        public TRAVELINGOffer GetOffer(TRAVELINGForm form)
        {
             TRAVELINGOffer result = GetTinkoffPrice( form );


            return result;
        }



        private TRAVELINGOffer getDefaultOfffer()
        {
            TRAVELINGOffer defaultOfffer = new TRAVELINGOffer();
            defaultOfffer.Company = Company;
            defaultOfffer.Name = "РГС Страхование";
            defaultOfffer.Description = "Какое-то описание для этой страховки";
            defaultOfffer.IsShown = false;
            defaultOfffer.AdditionalOptions = new AdditionalOption[5];
            defaultOfffer.AdditionalOptions[0] = new AdditionalOption() { Name = "параметр 1", Description = "до 40 000 руб" };
            defaultOfffer.AdditionalOptions[1] = new AdditionalOption() { Name = "параметр 2", Description = "до 50 000 руб" };
            defaultOfffer.AdditionalOptions[2] = new AdditionalOption() { Name = "параметр 3", Description = "" };
            defaultOfffer.AdditionalOptions[3] = new AdditionalOption() { Name = "параметр 4", Description = "" };
            defaultOfffer.AdditionalOptions[4] = new AdditionalOption() { Name = "параметр 5", Description = "" };

            return defaultOfffer;
        }

        private TRAVELINGOffer GetTinkoffPrice(TRAVELINGForm form)
        {

            TRAVELINGOffer reslut = getDefaultOfffer();
            var responseValue = string.Empty;
            string example = "{\"CaseID\":null,\"StepCalculation\":{\"Countries\":[\"677668cd-a6e0-4efe-960c-340502bc49d5\"],\"MultipleTours\":false,\"Promocode\":null,\"LeaveDate\":\"22.11.2015\",\"ReturnDate\":\"29.11.2015\",\"DatesAreNotSharp\":false,\"InsurancePeriodLength\":7,\"VisaDocumentDate\":null,\"ThereIsVisa\":null,\"FirstLeaveDate\":\"\",\"TripLength\":30,\"MultipleTourPeriod\":365,\"InsuredPersons\":[{\"FirstName\":\"AGHASI\",\"LastName\":\"GYURJOGHLYAN\",\"BirthDate\":\"01.11.2000\"}]},\"StepProgram\":{\"Program\":null,\"AdditionalRisks\":[],\"ActiveRest\":false,\"Pregnancy\":false,\"ChronicDiseases\":false}}";
            

            RGSRequest values = JsonConvert.DeserializeObject<RGSRequest>(example);
            
            List<string> array = new List<string>();

            for (int i = 0; i < form.countries.Length; ++i)
            {
                if (i < 5)
                {
                    array.Add(form.countries[i].id);
                }
            }
            values.StepCalculation.Countries = array.ToArray();
            //           values.StepCalculation.InsuredPersons = new InsuredPersons[10];
            List<InsuredPersons> ins = new List<InsuredPersons>();
            for (int i = 0; i < form.insureds.Length; ++i)
            {

                ins.Add(new InsuredPersons(form.insureds[i].ToString("dd'.'MM'.'yyyy")));
            }
            values.StepCalculation.InsuredPersons = ins.ToArray();
            values.StepProgram.ChronicDiseases = (form.chronic.ToString() == "true");
            values.StepCalculation.ReturnDate = form.periodFinish.ToString("dd'.'MM'.'yyyy");
            
            values.StepProgram.Pregnancy = (form.pregnant.ToString() == "true");
            values.StepCalculation.TripLength = (int)(form.periodFinish - form.periodStart).TotalDays;
            values.StepProgram.ActiveRest = (form.leisureOrSports.ToString() == "true");
            values.StepCalculation.MultipleTours = (form.choiceInsurance == 2) ? true: false;
            values.StepCalculation.TripLength = form.duration;

            if (values.StepCalculation.MultipleTours)
            {
                values.CaseID = 7716952;
                values.StepCalculation.FirstLeaveDate = form.periodStart.ToString("dd'.'MM'.'yyyy");
                values.StepCalculation.LeaveDate = "";
                values.StepCalculation.ReturnDate = "01.01.0000";
            }
            else
            {
                values.CaseID = 7686941;
                values.StepCalculation.LeaveDate = form.periodStart.ToString("dd'.'MM'.'yyyy");
            }
            values.CaseID = "(null)";
            
            string postData = JsonConvert.SerializeObject(values);

            var firstRequest = (HttpWebRequest)WebRequest.Create("https://www.rgs.ru/products/private_person/tour/strahovanie_turistov/calc/index.wbp");
            firstRequest.Method = "GET";

            CookieCollection coockie;
            using (var response = (HttpWebResponse)firstRequest.GetResponse())
            {
                coockie = response.Cookies;   
            }
            Uri target = new Uri("http://www.rgs.ru");
            var secondRequest = (HttpWebRequest)WebRequest.Create("https://www.rgs.ru/api/Vzr3/data.wbp");
            secondRequest.Method = "GET";
            secondRequest.Headers.Add("X-Requested-With", "XMLHttpRequest");
            secondRequest.Referer = "https://www.rgs.ru/products/private_person/tour/strahovanie_turistov/calc/index.wbp";
            secondRequest.Host = "www.rgs.ru";
            secondRequest.Accept = "application/json, text/javascript, */*; q=0.01";
            secondRequest.CookieContainer = new CookieContainer();

            secondRequest.CookieContainer.Add(coockie);

            using (var response = (HttpWebResponse)secondRequest.GetResponse())
            {
                coockie = response.Cookies;
            }

            var request = (HttpWebRequest)WebRequest.Create("https://www.rgs.ru/api/Vzr3/CalculateCase.wbp");
            request.Method = "POST";
            request.ContentType = "application/json; charset=UTF-8";
            request.Accept = "application/json, text/javascript, */*; q=0.01";
            request.Headers.Add("X-Requested-With", "XMLHttpRequest");

            request.Host = "www.rgs.ru";
            request.Referer = "https://www.rgs.ru/products/private_person/tour/strahovanie_turistov/calc/index.wbp";
            request.CookieContainer = new CookieContainer();

            request.Headers.Add("Accept-Language", "en-US,en;q=0.8,ru;q=0.6,hy;q=0.4");
            request.Headers.Add("Accept-Encoding", "gzip, deflate");
            request.UserAgent = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36";
            request.Headers.Add("Origin", "https://www.rgs.ru");

            request.CookieContainer.Add(coockie);
            request.CookieContainer.Add(new Cookie("_dc_gtm_UA-10653778-1", "1") { Domain = target.Host });
            request.CookieContainer.Add(new Cookie("_ym_uid", "1447780131922866490") { Domain = target.Host });
            request.CookieContainer.Add(new Cookie("_ym_isad", "1") { Domain = target.Host });
            request.CookieContainer.Add(new Cookie("_ym_visorc_396811", "w") { Domain = target.Host });
            request.CookieContainer.Add(new Cookie("_gat_UA-10653778-1", "1") { Domain = target.Host });
            request.CookieContainer.Add(new Cookie("_ga", "GA1.2.1849882077.1447780131") { Domain = target.Host });

            
            var bytes = Encoding.UTF8.GetBytes(postData);
            request.ContentLength = bytes.Length;
            using (var writeStream = request.GetRequestStream())
            {
                writeStream.Write(bytes, 0, bytes.Length);
            }

            using (var response = (HttpWebResponse)request.GetResponse())
            {
                using (var responseStream = response.GetResponseStream())
                {
                    if (responseStream != null)
                        using (var reader = new StreamReader(responseStream))
                        {
                            responseValue = reader.ReadToEnd();
                        }
                }
            }
            RGSResponse result = JsonConvert.DeserializeObject<RGSResponse>(responseValue);
            reslut.Total_SP = float.Parse(result.Programs[0].Premium.ToString());
            //TODO: rework this HELL
            NumberFormatInfo nfi = new CultureInfo("ru-RU", false).NumberFormat;
            nfi.NumberDecimalDigits = 0;
            string resultString = "";
            return reslut;
        }

        public string GetPrice(TRAVELINGForm form)
        {
            throw new NotImplementedException();
        }

        private class RGSRequest
        {
            public object CaseID { get; set; }
            public RGSCalculator StepCalculation { get; set; }
            public StepProgram StepProgram { get; set; }
        }

        private class RGSCalculator
        {
            public string[] Countries { get; set; }
            public bool DatesAreNotSharp { get; set; }
            public string FirstLeaveDate { get; set; }
            public int InsurancePeriodLength { get; set; }
            public InsuredPersons[] InsuredPersons { get; set; }
            public string LeaveDate { get; set; }
            public int MultipleTourPeriod { get; set; }
            public bool MultipleTours { get; set; }
            public object Promocode { get; set; }
            public string ReturnDate { get; set; }
            public object ThereIsVisa { get; set; }
            public int TripLength { get; set; }
            public object VisaDocumentDate { get; set; }

        }

        private class RGSResponse
        {
            public RGSResponseResult[] Programs { get; set; }
            public object CaseID { get; set; }
        }

        private class RGSResponseResult
        {
            public object ActiveRest { get; set; }
            public Dictionary<string, string>[] Risks { get; set; }
            public object ActiveRestPremium { get; set; }
            public object AdditionalK { get; set; }
            public object Currency { get; set; }
            public object InsuranceSum { get; set; }
            public object PregnancySum { get; set; }
            public object Premium { get; set; }
            public object Program { get; set; }
        }
    }
}
