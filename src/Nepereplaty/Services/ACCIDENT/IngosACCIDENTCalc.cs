using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.ACCIDENTCalcService;
using System.Net;
using HtmlAgilityPack;
using System.Collections.Specialized;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Nepereplaty.Services.ACCIDENT
{
    public class IngosACCIDENTCalc : IACCIDENTCalc
    {
        public InsuracneCompany Company { get; set; }

        public IngosACCIDENTCalc()
        {
            Company = new InsuracneCompany();
            Company.Id = 4;
            Company.Logo = "/i/partners/logo1.png";
            Company.Name = "Ингосстрах";
        }

        private ACCIDENTOffer getDefaultOfffer()
        {
            ACCIDENTOffer defaultOfffer = new ACCIDENTOffer();
            defaultOfffer.Company = Company;
            defaultOfffer.Name = "Ингосстрах Страхование";
            defaultOfffer.Description = "И это тоже описание, но уже для другой страховки";
            defaultOfffer.IsShown = false;
            defaultOfffer.AdditionalOptions = new AdditionalOption[5];
            defaultOfffer.AdditionalOptions[0] = new AdditionalOption() { Name = "параметр 1", Description = "до 40 000 руб" };
            defaultOfffer.AdditionalOptions[1] = new AdditionalOption() { Name = "параметр 2", Description = "до 50 000 руб" };
            defaultOfffer.AdditionalOptions[2] = new AdditionalOption() { Name = "параметр 3", Description = "" };
            defaultOfffer.AdditionalOptions[3] = new AdditionalOption() { Name = "параметр 4", Description = "" };
            defaultOfffer.AdditionalOptions[4] = new AdditionalOption() { Name = "параметр 5", Description = "" };

            return defaultOfffer;
        }
        public ACCIDENTOffer GetOffer(ACCIDENTForm form)
        {
            ACCIDENTOffer result = GetRealOffer(form);
            //   result.Price = GetPrice(form);

            return result;
        }

        public ACCIDENTOffer GetRealOffer(ACCIDENTForm form)
        {
            string vsvalue;
            string ingosResponse;
            string price;
            ACCIDENTOffer result = new ACCIDENTOffer();
            using (WebClient client = new WebClient())
            {

                string response = client.DownloadString("https://old.ingos.ru/ru/private/life/accident/calc/iframe/?v3=1");
                var cookie = client.ResponseHeaders[HttpResponseHeader.SetCookie];

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(response);
                var viewstate = doc.GetElementbyId("__VIEWSTATE");
                vsvalue = viewstate.GetAttributeValue("value", "");

                client.Headers.Add(HttpRequestHeader.Cookie, cookie);
                byte[] response2 = client.UploadValues("https://old.ingos.ru/ru/private/life/accident/calc/iframe/?v3=1", new NameValueCollection()
                {
                    { "bitrix_include_areas", "N" },
                    { "__EVENTTARGET", "" },
                    { "__EVENTARGUMENT", "" },
                    { "__VIEWSTATE", vsvalue },
                    { "", "igs_v2" },
                    { "__VIEWSTATEGENERATOR", "6D71E09F" },
                    { "__CALLBACKID", "ctl00$bxfullcontent1$AccidentCalc$AccidentCalc$AccidentCalc" },
                    { "__CALLBACKPARAM", GenerateIngosCallbackParam(form) }
              });
            

                ingosResponse = System.Text.Encoding.UTF8.GetString(response2);
                ingosResponse = ingosResponse.Remove(0, 2);
                Dictionary<string, object> values = JsonConvert.DeserializeObject<Dictionary<string, object>>(ingosResponse);
                JArray records = (JArray)values["Records"];
                result.Total_SP = 0;
                result.Total_SS = (form.age<18) ? 150000 : 300000;
                result.Total_SP = (float)records[1]["CostSum"];

            }
            //          result.osagoPrice = GetIngosOsagoPrice(form.isIndividual, form.power, form.isGuarantee, false, form.drivers);
            result.Company = Company;
            result.Name = "Ингосстрах Страхование";
            result.Description = "И это тоже описание, но уже для другой страховки";
            result.IsShown = false;
            result.AdditionalOptions = new AdditionalOption[5];
            result.AdditionalOptions[0] = new AdditionalOption() { Name = "параметр 1", Description = "до 40 000 руб" };
            result.AdditionalOptions[1] = new AdditionalOption() { Name = "параметр 2", Description = "до 50 000 руб" };
            result.AdditionalOptions[2] = new AdditionalOption() { Name = "параметр 3", Description = "" };
            result.AdditionalOptions[3] = new AdditionalOption() { Name = "параметр 4", Description = "" };
            result.AdditionalOptions[4] = new AdditionalOption() { Name = "параметр 5", Description = "" };
            return result;
        }

        private string GenerateIngosCallbackParam(ACCIDENTForm form)
        {

            string isAdult = (form.age > 17) ? "true" : "false";
            string isMyself = (form.otherPerson) ? "false" : "true";
            string ProductType = (form.amateurSports) ? "2" : "0";

            string result = "{\"MethodName\":\"Calc\",\"Parameters\":[{\"Key\":\"arg\",\"Value\":\"isAdult=" + isAdult + "&isMyself=" + isMyself + "&IsWork=false&ProductType=" + ProductType + "&PromoCode=";

            if (form.amateurSports)
            {
                result += "&CategoryOfSportList[0][Number]=1&CategoryOfSportList[0][InCompetitions]=false&CategoryOfSportList[0][KindsOfSport]=4165008503,4165085003,4165088103,4165088803,4165089303";
            }

            result += "\"}]}";

            return result;
        }
        public string GetPrice(ACCIDENTForm form)
        {
            throw new NotImplementedException();
        }
    }
}
