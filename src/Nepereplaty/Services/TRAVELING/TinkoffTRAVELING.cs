using Nepereplaty.Models.TRAVELINGCaclService;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Nepereplaty.Services.TRAVELING
{
    public class TinkkofTRAVELING :ITRAVELINGCalc
    {
        public InsuracneCompany Company { get; set; }

        public TinkkofTRAVELING()
        {
            Company = new InsuracneCompany();
            Company.Id = 1;
            Company.Logo = "/i/partners/logo3.png";
            Company.Name = "Тинькофф";
        }

        public TRAVELINGOffer GetOffer(TRAVELINGForm form)
        {
                TRAVELINGOffer result = GetTinkoffPrice(form);

            return result;
        }

      

        private TRAVELINGOffer getDefaultOfffer()
        {
            TRAVELINGOffer defaultOfffer = new TRAVELINGOffer();
            defaultOfffer.Company = Company;
            defaultOfffer.Name = "Тинькофф Страхование";
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

            TRAVELINGOffer result = getDefaultOfffer();
            var responseValue = string.Empty;

            string example = "{\"Calculator\":[{\"TermType\":\"Single\",\"Currency\":\"EUR\",\"TripStartDate\":\"2015 - 11 - 25\",\"TripEndDate\":\"2015 - 11 - 29\",\"TripDayCount\":\"10\",\"QuantityAdults\":\"2\",\"QuantityChildren\":\"0\",\"QuantitySeniors\":\"0\",\"SumAssuredCode\":\"50000\",\"SportActivity\":\"None\",\"Luggage\":false,\"TripCancellation\":false,\"Countries\":[\"FR\",\"DE\"],\"TimeZone\":-240},{\"TermType\":\"Single\",\"Currency\":\"EUR\",\"TripStartDate\":\"2015 - 11 - 25\",\"TripEndDate\":\"2015 - 11 - 29\",\"TripDayCount\":\"10\",\"QuantityAdults\":\"2\",\"QuantityChildren\":\"0\",\"QuantitySeniors\":\"0\",\"SumAssuredCode\":\"50000\",\"SportActivity\":\"ActiveLeisure\",\"Luggage\":false,\"TripCancellation\":false,\"Countries\":[\"FR\",\"DE\"],\"TimeZone\":-240},{\"TermType\":\"Single\",\"Currency\":\"EUR\",\"TripStartDate\":\"2015 - 11 - 20\",\"TripEndDate\":\"2015 - 11 - 29\",\"TripDayCount\":\"10\",\"QuantityAdults\":\"2\",\"QuantityChildren\":\"0\",\"QuantitySeniors\":\"0\",\"SumAssuredCode\":\"50000\",\"SportActivity\":\"Extreme\",\"Luggage\":false,\"TripCancellation\":false,\"Countries\":[\"FR\",\"DE\"],\"TimeZone\":-240}],\"Settings\":{\"subject\":\"newvzr\",\"view\":\"\",\"view - name\":\"travel\",\"calculation_id\":194851,\"collapsed\":false,\"tourists\":2,\"CIS\":false,\"flat\":true}}";

            ThinkoffRequest values = JsonConvert.DeserializeObject<ThinkoffRequest>(example);

            List<string> array = new List<string>();

            for (int i = 0; i < form.countries.Length; ++i)
            {
                if (i < 5)
                {
                    array.Add(form.countries[i].code);
                }
            }
            values.Calculator[0].TermType = (form.choiceInsurance == 2) ? "Annual" : "Single";
            values.Calculator[1].TermType = (form.choiceInsurance == 2) ? "Annual" : "Single";
            values.Calculator[2].TermType = (form.choiceInsurance == 2) ? "Annual" : "Single";

            values.Calculator[0].Countries = array.ToArray();
            values.Calculator[1].Countries = array.ToArray();
            values.Calculator[2].Countries = array.ToArray();
            values.Calculator[0].Currency = (string)form.currencyAndSum;
            values.Calculator[1].Currency = (string)form.currencyAndSum;
            values.Calculator[2].Currency = (string)form.currencyAndSum; 
            int adult = 0;
            int young = 0;
            int old = 0;
            DateTime now = DateTime.Today;
            for (int i = 0; i < form.insureds.Length; ++i)
            {
                double dif = ((now - form.insureds[i]).TotalDays)/ 365.242;

                if (dif > 12)
                {
                    if(dif > 61)
                    {
                        old++;
                    }
                    else
                    {
                        adult++;
                    }
                }
                else
                {
                    young++;
                }
            }
            values.Calculator[0].QuantityAdults = values.Calculator[1].QuantityAdults = values.Calculator[2].QuantityAdults = adult.ToString();
            values.Calculator[0].QuantityChildren = values.Calculator[1].QuantityChildren = values.Calculator[2].QuantityChildren = young.ToString();
            values.Calculator[0].QuantitySeniors = values.Calculator[1].QuantitySeniors = values.Calculator[2].QuantitySeniors = old.ToString();


            values.Calculator[0].TripStartDate = values.Calculator[1].TripStartDate = values.Calculator[2].TripStartDate = form.periodStart.ToString("yyy'-'MM'-'dd")+ "T00:00:00+04:00";
            
            if(form.choiceInsurance == 2)
            {
                values.Calculator[0].TripDayCount = form.duration.ToString();
                values.Calculator[1].TripDayCount = form.duration.ToString();
                values.Calculator[2].TripDayCount = form.duration.ToString();
                values.Calculator[0].TripEndDate = values.Calculator[1].TripEndDate = values.Calculator[2].TripEndDate = form.periodStart.ToString("yyy'-'MM'-'dd").Replace("2015","2016");
            }
            else
            {
                values.Calculator[0].TripEndDate = values.Calculator[1].TripEndDate = values.Calculator[2].TripEndDate = form.periodFinish.ToString("yyy'-'MM'-'dd");
                values.Calculator[0].TripDayCount = values.Calculator[1].TripDayCount = values.Calculator[2].TripDayCount = ((int)(form.periodFinish - form.periodStart).TotalDays+1).ToString();
            }


            string postData = JsonConvert.SerializeObject(values);

            var request = (HttpWebRequest)WebRequest.Create("https://www.tinkoffinsurance.ru/api/travelcalculator/");
            request.Method = "POST";
            request.ContentType = "application/json; charset=UTF-8";
            request.Accept = "application/json, text/javascript, */*; q=0.01";
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
            ThinkoffResponse resulta = JsonConvert.DeserializeObject<ThinkoffResponse>(responseValue);


            result.Total_SP = float.Parse(resulta.Result[0].TotalCost.ToString());
            //TODO: rework this HELL
            NumberFormatInfo nfi = new CultureInfo("ru-RU", false).NumberFormat;
            nfi.NumberDecimalDigits = 0;
            return result;
        }

        public string GetPrice(TRAVELINGForm form)
        {
            throw new NotImplementedException();
        }

        private class ThinkoffRequest
        {
            public ThinkoffCalculator[] Calculator { get; set; }
            public object Settings { get; set; }
        }

        private class ThinkoffCalculator
        {
            public string[] Countries { get; set; }
            public string Currency { get; set; }
            public bool Luggage { get; set; }
            public string QuantityAdults { get; set; }
            public string QuantityChildren { get; set; }
            public string QuantitySeniors { get; set; }
            public string SportActivity { get; set; }
            public string SumAssuredCode { get; set; }
            public string TermType { get; set; }
            public object TimeZone { get; set; }
            public bool TripCancellation { get; set; }
            public string TripDayCount { get; set; }
            public string TripEndDate { get; set; }
            public string TripStartDate { get; set; }
          
        }

        private class ThinkoffResponse
        {
            public ThinkoffResponseResult[] Result { get; set; }
            public object Calculator { get; set; }
            public object Code { get; set; }
            public object Id { get; set; }
        }

        private class ThinkoffResponseResult
        {
            public object KBMInfo { get; set; }
            public Dictionary<string, string>[] Coverages { get; set; }
            public Dictionary<string, string> DiscountInfo { get; set; }
            public object NonDiscountedPremium { get; set; }
            public object TotalCost { get; set; }
            public object TotalCoveredAmount { get; set; }
            public object UnderwritingIssues { get; set; }
        }
    }
}
