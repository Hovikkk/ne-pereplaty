using HtmlAgilityPack;
using Nepereplaty.Models.Cars;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Nepereplaty.Services
{

    public class Records
    {
        public string Name;
        public string Title;
        public string ISN;
    }
    public class GrabCityIngos
    {
       



        char[] chars = { 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я' };

        List<Records> alls =new List<Records>();

        List<string> ids;
        string vsvalue;

        private List<string> creatArray()
        {
            List<string> result = new List<string>();

            for(uint i = 0; i < chars.Length; ++i)
            {
                for (uint  j= 0; j < chars.Length; ++j)
                {
                    for (uint k = 0; k < chars.Length; ++k)
                    {
                        result.Add(chars[i].ToString() + chars[j].ToString() + chars[k].ToString());
                    }
                }
            }

            return result;
        }

        public GrabCityIngos()
        {

            using (WebClient client = new WebClient())
            {



                string response = client.DownloadString("https://old.ingos.ru/ru/private/property/house/calc/iframe/?v3=1");
                var cookie = client.ResponseHeaders[HttpResponseHeader.SetCookie];

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(response);
                var viewstate = doc.GetElementbyId("__VIEWSTATE");
                vsvalue = viewstate.GetAttributeValue("value", "");
            }


           // init();
        }

        public City[] getCity(string id)
        {
            List<Records> tmp = grab(id);
            City[] result = JsonConvert.DeserializeObject<City[]>(JsonConvert.SerializeObject(tmp.ToArray()));

            return result;
        }

        private void init()
        {
            int i = 0;
            ids = creatArray();
            for (i = 0; i < ids.Count; ++i)
            {
                List<Records> tmp = grab(ids[i]);
                for (int j = 0; j < tmp.Count; ++j)
                {
                    bool isAre = false;
                    for (int k = 0; k < alls.Count; ++k)
                    {
                        if (alls[k].ISN == tmp[j].ISN)
                        {
                            isAre = true;
                            break;
                        }
                    }
                    if (!isAre)
                    {
                        alls.Add(tmp[j]);
                    }
                }
            }


            string jsonText = JsonConvert.SerializeObject(alls.ToArray());

            string d = jsonText;
        }
       
        private List<Records> grab(string id)
        {
           
            string ingosResponse;
            string price;
            List<Records> result ;

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
                    { "", "1" },
                    { "request_phone_code", "" },
                    { "request_phone_number", "" },
                    { "", "" },
                    { "", "" },
                    { "", "" },
                    { "", "" },
                    { "", "ctl00$ContentTopPage$sendrequestcomponent$sendrequestcomponent$sendrequestcomponent$fs_Captcha$fs_Captcha$fs_Captcha" },
                    { "", "ctl00$contenttoppage$sendrequestcomponent$sendrequestcomponent$sendrequestcomponent$Includecomponent1$Includecomponent1$Includecomponent1" },
                    { "", "ctl00$contenttoppage$sendrequestcomponent$sendrequestcomponent$sendrequestcomponent" },
                    { "", "igs_v2" },
                    { "request_name", "" },
                    { "request_email", "" },
                    { "request_phone_code", "" },
                    { "request_phone_number", "" },
                    { "request_email", "" },
                    { "", "ctl00$ContentTopPage$sendfeedbackform$sendfeedbackform$sendfeedbackform" },
                    { "regionValue",""},
                    { "region",""},
                    {"","250 000"},
                    {"","ctl00$bxfullcontent1$igscalc_freedom_construction1$igscalc_freedom_construction1$igscalc_freedom_construction1$feedbackcomponent$feedbackcomponent$feedbackcomponent"},
                    {"","on"},
                    {"","on"},
                    {"","ctl00$bxfullcontent1$igscalc_freedom_construction1$igscalc_freedom_construction1$igscalc_freedom_construction1"},
                    { "__VIEWSTATEGENERATOR", "85A33B4B" },
                    { "__CALLBACKID", "ctl00$bxfullcontent1$igscalc_freedom_construction1$igscalc_freedom_construction1$igscalc_freedom_construction1$region" },
                    { "__CALLBACKPARAM", "{\"MethodName\":\"JQAutocompleteCity_FindCity\",\"Parameters\":[{\"Key\":\"arg1\",\"Value\":\""+id+"\"}]}"}
                });

                ingosResponse = System.Text.Encoding.UTF8.GetString(response2);
                ingosResponse = ingosResponse.Remove(0, 2);
                
                Dictionary<string, object> values = JsonConvert.DeserializeObject<Dictionary<string, object>>(ingosResponse);
                JArray records = (JArray)values["Records"];
                result = JsonConvert.DeserializeObject<List<Records>>(JsonConvert.SerializeObject(records)); 
            }
           
            return result;
        }
        
    }
}
