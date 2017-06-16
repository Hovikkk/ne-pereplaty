using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.HOUSECalcService;
using HtmlAgilityPack;
using System.Net;
using System.Collections.Specialized;
using Newtonsoft.Json.Linq;
using System.Globalization;
using Newtonsoft.Json;

namespace Nepereplaty.Services.HOUSE
{
    public class IngosHOUSECalc : IHOUSECalc
    {


        public InsuracneCompany Company { get; set; }
        public float[] additional = { 0.0092f, 0.0057f, 0.0046f };

        public IngosHOUSECalc()
        {
            Company = new InsuracneCompany();
            Company.Id = 4;
            Company.Logo = "/i/partners/logo1.png";
            Company.Name = "Ингосстрах";
        }

        public HOUSEOffer GetOffer(HOUSEForm form)
        {
            HOUSEOffer result = GetRealOffer(form);
            //   result.Price = GetPrice(form);

            return result;
        }

        private HOUSEOffer getDefaultOfffer()
        {
            HOUSEOffer defaultOfffer = new HOUSEOffer();
            defaultOfffer.Company = Company;
            defaultOfffer.Name = "Полис Ингосстрах Страхование";
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



        public HOUSEOffer GetRealOffer(HOUSEForm form)
        {
            string vsvalue;
            string ingosResponse;
            string price;
            HOUSEOffer result = new HOUSEOffer();
            using (WebClient client = new WebClient())
            {

                string response = client.DownloadString("https://old.ingos.ru/ru/private/property/house/calc/iframe/?v3=1");
                var cookie = client.ResponseHeaders[HttpResponseHeader.SetCookie];

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(response);
                var viewstate = doc.GetElementbyId("__VIEWSTATE");
                vsvalue = viewstate.GetAttributeValue("value", "");

                client.Headers.Add(HttpRequestHeader.Cookie, cookie);
                byte[] response2 = client.UploadValues("https://old.ingos.ru/ru/private/property/house/calc/iframe/?v3=1", new NameValueCollection()
                {
                    { "bitrix_include_areas", "N" },
                    { "__EVENTTARGET", "" },
                    { "__EVENTARGUMENT", "" },
                    { "__VIEWSTATE", vsvalue },
                    { "", "default_v2" },
                    { "sendrequest_regionValue", "" },
                    { "sendrequest_region", "" },
                    { "", "" },
                    { "", "" },
                    { "", "" },
                    { "", "" },
                    { "", "" },
                    { "", "" },
                    { "", "0" },
                    { "request_phone_code", "" },
                    { "request_phone_number", "" },
                    { "", "" },
                    { "", "" },
                    { "", "" },
                    { "", "" },
                    { "", "ctl00$contenttoppage$sendrequestcomponent$sendrequestcomponent$sendrequestcomponent$fs_Captcha$fs_Captcha$fs_Captcha" },
                    { "", "ctl00$contenttoppage$sendrequestcomponent$sendrequestcomponent$sendrequestcomponent$Includecomponent1$Includecomponent1$Includecomponent1" },
                    { "", "ctl00$contenttoppage$sendrequestcomponent$sendrequestcomponent$sendrequestcomponent" },
                    { "", "igs_v2" },
                    {"",""},
                    {"",""},
                    {"",""},
                    {"",""},
                    {"",""},
                    {"","ctl00$contenttoppage$sendfeedbackform$sendfeedbackform$sendfeedbackform"},
                    {"regionValue",""},
                    {"region",""},
                    {"","250 000"},
                    {"","ctl00$bxfullcontent1$igscalc_freedom_construction1$igscalc_freedom_construction1$igscalc_freedom_construction1$feedbackcomponent$feedbackcomponent$feedbackcomponent"},
                    { "","on"},
                    {"", "on"},
                    {"","ctl00$bxfullcontent1$igscalc_freedom_construction1$igscalc_freedom_construction1$igscalc_freedom_construction1"},
                    { "__VIEWSTATEGENERATOR", "85A33B4B" },
                    { "__CALLBACKID", "ctl00$bxfullcontent1$igscalc_freedom_construction1$igscalc_freedom_construction1$igscalc_freedom_construction1" },
                    { "__CALLBACKPARAM", GenerateIngosCallbackParam(form) }
              });

                ingosResponse = System.Text.Encoding.UTF8.GetString(response2);
                ingosResponse = ingosResponse.Remove(0, 2);
                Dictionary<string, object> values = JsonConvert.DeserializeObject<Dictionary<string, object>>(ingosResponse);
                JArray records = (JArray)values["Objects"];
                result.Total_SP = 0;
                for (int i = 0; i < records.Count; ++i)
                {
                    result.Total_SP += float.Parse(records[i]["PremiumSum"].ToString());
                }

                
            }
  //          result.osagoPrice = GetIngosOsagoPrice(form.isIndividual, form.power, form.isGuarantee, false, form.drivers);
            result.Company = Company;
            result.Name = "Полис Ингосстрах Страхование";
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
        private string GenerateIngosCallbackParam(HOUSEForm form)
        {

            string result = "{ \"MethodName\":\"Calc\",\"Parameters\":[{\"Key\":\"arg\",\"Value\":\"Objects[0][Type]=0&Objects[0][IsWood]="+(form.cover=="1")+"&Objects[0][InsSum]=700000&Objects[0][Square]=100&Objects[0][Year]="+form.year+"&Objects[0][IsLockable]=false&Objects[0][IsInclude]=true";
            int i = 1;
            foreach (AdditionalStructure aS in form.additionalStructure)
            {
                result += "Objects["+i+ "][Type]="+aS.type+"&Objects[" + i + "][IsWood]=" + (form.cover == "1") + "&Objects[" + i + "][InsSum]="+aS.cost+"&Objects[" + i + "][Square]=100&Objects[" + i + "][Year]=" + form.year + "&Objects[" + i + "][IsLockable]=false&Objects[" + i + "][IsInclude]=true";
                i++;
            }

            result += "&GoSum=0&MovablesSum=0&HasCasko=false&HasFire=false&HasAny=false\"}]}";

            return result;
        }
        public string GetPrice(HOUSEForm form)
        {
            throw new NotImplementedException();
        }
    }
}
