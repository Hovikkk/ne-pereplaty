using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.APARTMENTCalcService;
using System.Net;
using HtmlAgilityPack;
using System.Collections.Specialized;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Nepereplaty.Services.APARTMENT
{
    public class IngosAPARTMENTCalc : IAPARTMENTCalc
    {
        public InsuracneCompany Company { get; set; }

        public IngosAPARTMENTCalc()
        {
            Company = new InsuracneCompany();
            Company.Id = 4;
            Company.Logo = "/i/partners/logo1.png";
            Company.Name = "Ингосстрах";
        }
        public APARTMENTOffer GetOffer(APARTMENTForm form)
        {
            string vsvalue;
            string ingosResponse;
            string price;
            APARTMENTOffer result = new APARTMENTOffer();
            using (WebClient client = new WebClient())
            {

                string response = client.DownloadString("https://old.ingos.ru/ru/private/property/flat/calc/iframe/?V4=1");
                var cookie = client.ResponseHeaders[HttpResponseHeader.SetCookie];

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(response);
                var viewstate = doc.GetElementbyId("__VIEWSTATE");
                vsvalue = viewstate.GetAttributeValue("value", "");

                client.Headers.Add(HttpRequestHeader.Cookie, cookie);
                byte[] response2 = client.UploadValues("https://old.ingos.ru/ru/private/property/flat/calc/iframe/?V4=1", new NameValueCollection()
                    {
                        
                        { "bitrix_include_areas", "N" },
                        { "__EVENTTARGET", "" },
                        { "__EVENTARGUMENT", "" },
                        { "__VIEWSTATE", vsvalue},
                        { "", "default" },
                        { "sendrequest_regionValue", "" },
                        { "sendrequest_region", "" },
                        { "", "" },
                        { "", "" },
                        { "", "" },
                        { "", "" },
                        { "", "" },
                        { "", "" },
                        { "", "1" },
                        { "request_phone_code", "" },
                        { "request_phone_number", "" },
                        { "", "" },
                        { "", "" },
                        { "", "" },
                        { "", "" },
                        { "", "ctl00$ContentTopPage$sendrequestcomponent$sendrequestcomponent$sendrequestcomponent$fs_Captcha$fs_Captcha$fs_Captcha" },
                        { "", "ctl00$ContentTopPage$sendrequestcomponent$sendrequestcomponent$sendrequestcomponent$feedbackcomponent$feedbackcomponent$feedbackcomponent" },
                        { "", "ctl00$ContentTopPage$sendrequestcomponent$sendrequestcomponent$sendrequestcomponent" },
                        { "", "igs" },
                        {"request_name",""},
                        {"request_email",""},
                        {"request_phone_code",""},
                        {"request_phone_number",""},
                        {"request_email",""},
                        {"","ctl00$ContentTopPage$sendfeedbackform$sendfeedbackform$sendfeedbackform"},
                        {"regionValue",""},
                        {"region",""},
                        { "","2"},
                        { "",""},
                        { "","500000"},
                        { "","on"},
                        { "", "300000"},
                        { "","0"},
                        { "","ctl00$BXFullContent1$igscalc_freedom_construction1$igscalc_freedom_construction1$igscalc_freedom_construction1$feedbackcomponent$feedbackcomponent$feedbackcomponent"},
                        {"","ctl00$BXFullContent1$igscalc_freedom_construction1$igscalc_freedom_construction1$igscalc_freedom_construction1" },
                        { "__VIEWSTATEGENERATOR", "A9767089" },
                        { "__CALLBACKID", "ctl00$BXFullContent1$igscalc_freedom_construction1$igscalc_freedom_construction1$igscalc_freedom_construction1" },
                        { "__CALLBACKPARAM", GenerateIngosCallbackParam(form) }
                  });

                ingosResponse = System.Text.Encoding.UTF8.GetString(response2);
                ingosResponse = ingosResponse.Remove(0, 2);
                Dictionary<string, object> values = JsonConvert.DeserializeObject<Dictionary<string, object>>(ingosResponse);
                JArray records = (JArray)values["Records"];
                result.Total_SP = float.Parse(records[1]["PremiumSum"].ToString());
               


            }
            //          result.osagoPrice = GetIngosOsagoPrice(form.isIndividual, form.power, form.isGuarantee, false, form.drivers);
            result.Company = Company;
            result.Name = "Полис Ингосстрах Страхование";
            result.AdditionalOptions = new AdditionalOption[5];
            result.AdditionalOptions[0] = new AdditionalOption() { Name = "параметр 1", Description = "до 40 000 руб" };
            result.AdditionalOptions[1] = new AdditionalOption() { Name = "параметр 2", Description = "до 50 000 руб" };
            result.AdditionalOptions[2] = new AdditionalOption() { Name = "параметр 3", Description = "" };
            result.AdditionalOptions[3] = new AdditionalOption() { Name = "параметр 4", Description = "" };
            result.AdditionalOptions[4] = new AdditionalOption() { Name = "параметр 5", Description = "" };
            return result;
        }
        private string GenerateIngosCallbackParam(APARTMENTForm form)
        {
           // string result = "{\"MethodName\":\"GetVariants\",\"Parameters\":[{\"Key\":\"arg\",\"Value\":\"ObjectType = 1 & RegionISN = 3783 & TypeOfFlat = 2 & Area = 80 & InsSum = 1000000 & GoSum = 300000 & HasCasko = false & HasFire = false & HasAny = false & PromoCode = \"}]}";
           string result  = "{\"MethodName\":\"GetVariants\",\"Parameters\":[{\"Key\":\"arg\",\"Value\":\"ObjectType=1&RegionISN=3783&TypeOfFlat=2&Area="+form.area+"&InsSum="+form.sum+"&GoSum=0&HasCasko=false&HasFire=false&HasAny=false\"}]}";
            return result;
        }
        public string GetPrice(APARTMENTForm form)
        {
            throw new NotImplementedException();
        }
    }
}
