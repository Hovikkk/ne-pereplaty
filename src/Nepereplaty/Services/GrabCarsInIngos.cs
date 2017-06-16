using HtmlAgilityPack;
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

    public class GrabCarsInIngos
    {
        private class Brend
        {
            public Model[] Models;
            public string Name;
            public string Id;
        }
        private class Model
        {
            public string BrandID;
            public string ID; 
            public string ModifISN; 
            public string Title; 
        }

        string brandsString = "{\"12505216\":\"ALFA ROMEO\",\"12507416\":\"AUDI\",\"12510116\":\"BMW\",\"12511116\":\"CADILLAC\",\"12512716\":\"CHEVROLET\",\"12513416\":\"CITROEN\",\"12514916\":\"DAEWOO\",\"644337216\":\"DATSUN\",\"12518716\":\"FIAT\",\"12519116\":\"FORD\",\"12523516\":\"HONDA\",\"12524016\":\"HYUNDAI\",\"12524416\":\"INFINITI\",\"12525516\":\"JAGUAR\",\"12525716\":\"JEEP\",\"12527516\":\"KIA\",\"12530116\":\"LAND ROVER\",\"27909516\":\"LEXUS\",\"12533216\":\"MAZDA\",\"57331016\":\"MERCEDES-BENZ\",\"705431116\":\"MINI\",\"12534116\":\"MITSUBISHI\",\"12536316\":\"NISSAN\",\"12537816\":\"OPEL\",\"12539316\":\"PEUGEOT\",\"12542216\":\"RENAULT\",\"12547016\":\"SKODA\",\"12548116\":\"SSANGYONG\",\"12548716\":\"SUBARU\",\"12548916\":\"SUZUKI\",\"12550616\":\"TOYOTA\",\"12554116\":\"VOLKSWAGEN\",\"12554216\":\"VOLVO\"}";

        string carOptions;
        uint globalI = 0;
        Dictionary<string, string> brands;
        Brend[] alls = new Brend[35];

        public GrabCarsInIngos()
        {
            
            brands = JsonConvert.DeserializeObject<Dictionary<string, string>>(brandsString);
            uint i=0;
            foreach (string key in brands.Keys)
            {
                alls[i] = new Brend { Name = brands[key], Id = key };
                i++;
            }
            
           

        }

        public string getData()
        {
            string result = "";
            globalI = 0;
            result = grab(alls[globalI].Id);
            return result;

        }
        private string grab(string id)
        {
            string vsvalue;
            string ingosResponse;
            string price;

            
            using (WebClient client = new WebClient())
            {


                 
                string response = client.DownloadString("http://old.ingos.ru//ru/private/auto/kasko/calc/iframe/?v4=1");
                var cookie = client.ResponseHeaders[HttpResponseHeader.SetCookie];

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(response);
                var viewstate = doc.GetElementbyId("__VIEWSTATE");
                vsvalue = viewstate.GetAttributeValue("value", "");

                client.Headers.Add(HttpRequestHeader.Cookie, cookie);
                byte[] response2 = client.UploadValues("http://old.ingos.ru/ru/private/auto/kasko/calc/iframe/?v4=1", new NameValueCollection()
                {
                    { "bitrix_include_areas", "N" },
                    { "__EVENTTARGET", "" },
                    { "__EVENTARGUMENT", "" },
                    { "__VIEWSTATE", vsvalue },
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
                    { "request_name", "" },
                    { "request_email", "" },
                    { "request_phone_code", "" },
                    { "request_phone_number", "" },
                    { "request_email", "" },
                    { "", "ctl00$ContentTopPage$sendfeedbackform$sendfeedbackform$sendfeedbackform" },
                    { "regionValue",""},
                    { "region",""},
                    {"",""},
                    {"",""},
                    {"",""},
                    {"",""},
                    {"",""},
                    {"",""},
                    {"",""},
                    {"",""},
                    {"",""},
                    {"test1","on"},
                    {"var_inc","on"},
                    {"var_inc","on"},
                    {" ","false"},
                    {"",""},
                    { "var_incs","on"},
                    {"var_incm", "on"},
                    {"",""},
                    {"",""},
                    {"","1"},
                    {"","1"},
                    {"","2"},
                    {"",""},
                    {"",""},
                    {"","1"},
                    {"","1"},
                    {"","2"},
                    {"",""},
                    {"",""},
                    {"","1"},
                    {"","1"},
                    {"","2"},
                    {"","7"},
                    { "var_p1","on"},
                    { "var_1","on"},
                    {""," 0"},
                    {"","0"},
                    {"","0"},
                    {"","1"},
                    {"",""},
                    {"","0"},
                    {"","ctl00$BXFullContent1$igscalc_casco_calculation1$igscalc_casco_calculation1$igscalc_casco_calculation1$feedbackcomponent$feedbackcomponent$feedbackcomponent"},
                    {"","ctl00$BXFullContent1$igscalc_casco_calculation1$igscalc_casco_calculation1$igscalc_casco_calculation1"},
                    {"","ctl00$BXFullContent1$igscalc_casco_calculationresult1$igscalc_casco_calculationresult1$igscalc_casco_calculationresult1"},
                    { "__VIEWSTATEGENERATOR", "1FD4AAAB" },
                    { "__CALLBACKID", "ctl00$BXFullContent1$igscalc_casco_calculation1$igscalc_casco_calculation1$igscalc_casco_calculation1" },
                    { "__CALLBACKPARAM", "{\"MethodName\":\"CASCO_GetModelsHight\",\"Parameters\":[{\"Key\":\"agr1\",\"Value\":\""+id+"\"}]}"}
                });

                ingosResponse = System.Text.Encoding.UTF8.GetString(response2);
                ingosResponse = ingosResponse.Remove(0, 2);
                
                Dictionary<string, object> values = JsonConvert.DeserializeObject<Dictionary<string, object>>(ingosResponse);
                JArray records = (JArray)values["Records"];
                alls[globalI].Models = JsonConvert.DeserializeObject<Model[]>(JsonConvert.SerializeObject(records)); 
            }
            globalI++;
            if (alls[globalI] != null) { string d = grab(alls[globalI].Id); }

            return JsonConvert.SerializeObject(alls);
        }
        
    }
}
