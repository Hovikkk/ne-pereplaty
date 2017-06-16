using HtmlAgilityPack;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Nepereplaty.Models.CASCOCalcService;
using System.Diagnostics;
using Newtonsoft.Json.Linq;

namespace Nepereplaty.Services.CASCO
{
    public class IngosCASCOCalc : ICASCOCalc
    {
        public InsuracneCompany Company { get; set; }
       
        
        public IngosCASCOCalc()
        {
            Company = new InsuracneCompany();
            Company.Id = 4;
            Company.Logo = "/i/partners/logo1.png";
            Company.Name = "Ингосстрах";
        }
        public CASCOOffer GetOffer(CASCOForm form)
        {
            string vsvalue;
            string ingosResponse;
            string price;
            CASCOOffer result = new CASCOOffer();
            using (WebClient client = new WebClient())
            {

                string response = client.DownloadString("http://old.ingos.ru//ru/private/auto/kasko/calc/iframe/?v4=1");
                var cookie = client.ResponseHeaders[HttpResponseHeader.SetCookie];
                
                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(response);
                var viewstate = doc.GetElementbyId("__VIEWSTATE");
                vsvalue = viewstate.GetAttributeValue("value", "");

                client.Headers.Add(HttpRequestHeader.Cookie, cookie);
                byte[] response2 = client.UploadValues("http://old.ingos.ru/ru/private/auto/kasko/calc/iframe/?v4=1",new NameValueCollection()
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
                    { "__CALLBACKPARAM", GenerateIngosCallbackParam(form) }
              });

                ingosResponse = System.Text.Encoding.UTF8.GetString(response2);
                ingosResponse = ingosResponse.Remove(0, 2);
                Dictionary<string, object> values = JsonConvert.DeserializeObject<Dictionary<string, object>>(ingosResponse);
                JArray records = (JArray)values["Records"];
                NumberFormatInfo nfi = new CultureInfo("ru-RU", false).NumberFormat;
                nfi.NumberDecimalDigits = 0;
                var res = records[0]["PremiumSum"].ToString();
                var indexOfComa = (res.IndexOf('.') < 0) ? (res.IndexOf(',') < 0) ? -1 : res.IndexOf(',') : res.IndexOf('.');
                if (indexOfComa > 0)
                {
                    var firstPart = Int32.Parse(res.Substring(0, indexOfComa));
                    var secondPart = Int32.Parse(res.Substring(indexOfComa + 1, res.Length - indexOfComa - 1));
                    var secondString = secondPart.ToString();
                    secondString = (secondString.Length < 2) ? secondString + "0" : secondString;
                    secondString = (secondString.Length < 2) ? secondString + "0" : secondString;
                    price = firstPart.ToString("N", nfi) + "," + secondString;
                }
                else
                {
                    if (float.Parse(res) > 1000)
                    {
                        price = res.Substring(0, res.Length - 3) + " " + res.Substring(res.Length - 3, 3) + ".00";
                    }
                    else
                    {
                        price = res + ".00";
                    }
                }

            }
            result.osagoPrice = GetIngosOsagoPrice(form.isIndividual, form.power, form.isGuarantee, false, form.drivers);
            result.Company = Company;
            result.Name = "Полис2";
            result.AntiTheftSystem = "не требуется";
            result.Description = "Какое-то описание для этой страховки";
            result.IsShown = false;
            result.Price = price;
            result.AdditionalOptions = new AdditionalOption[5];
            result.AdditionalOptions[0] = new AdditionalOption() { Name = "Гражданская ответственость за повреждение имущества", Description = "до 40 000 руб" };
            result.AdditionalOptions[1] = new AdditionalOption() { Name = "Гражданская ответственность за ущерб жизни и здоровью", Description = "до 50 000 руб" };
            result.AdditionalOptions[2] = new AdditionalOption() { Name = "Услуги аварийного комиссара", Description = "" };
            result.AdditionalOptions[3] = new AdditionalOption() { Name = "Сбор справок", Description = "" };
            result.AdditionalOptions[4] = new AdditionalOption() { Name = "Эвакуация автомобиля", Description = "" };
            return result;
        }

        private string GenerateIngosCallbackParam(CASCOForm form)
        {
            /*
            var driverString = "";
            for (int i = 0; i < form.drivers.Length; i++)
            {
                driverString += "&Drivers%5B" + i.ToString() + "%5D%5BYears%5D=";
                driverString += form.drivers[i].age.ToString();
                switch (form.drivers[i].age)
                {
                    case '1':
                        driverString += "21";
                        break;
                    case '2':
                        driverString += "23";
                        break;
                    case '3':
                        driverString += "23";
                        break;
                    case '4':
                        driverString += "23";
                        break;
                    default:
                        driverString += "23";
                        break;
                }
                driverString += "&Drivers%5B" + i.ToString() + "%5D%5BDriver%5D=";
                driverString += form.drivers[i].experience.ToString();
                switch (form.drivers[i].experience)
                {
                    case '1':
                        driverString += "2";
                        break;
                    case '2':
                        driverString += "2";
                        break;
                    case '3':
                        driverString += "4";
                        break;
                    case '4':
                        driverString += "4";
                        break;
                    default:
                        driverString += "2";
                        break;
                }
            }
            */
            
            string result = "{ \"MethodName\":\"CASCO_Calc\",\"Parameters\":[{\"Key\":\"agr1\",\"Value\":\"CarBrand=" + form.brand.Split('_')[1] + "&CarModel=" + form.model.Split('_')[1] + "&alCarBrand=&alCarModel=&CarYear=" + form.releaseYear + "&AlterCarYear=&AlterCheck=false&CarInsuranceCost="+form.carCost+"&UsageDate=07.10.2015&Mileage=0&AntiTheftEnabled=false&AntiTheftSet=&AutoStart=false&CloseList=true&MultiDrive=false&MutliDriveLight=false&AutoCredit=0&HousePower="+form.power+"&EngineType=%D0%91%D0%B5%D0%BD%D0%B7%D0%B8%D0%BD&InsurancePeriod=7&NoAmort=0&Profi=N&NoBamperMirror=N&NoGlass=N&NoLamp=N&NoWheels=N&FranchSumm="+form.franchise.Split('_')[1]+ "&Modify=646461676&LimitSumm=0&EquipmentSumm=0&OtherSumm=0&InsuranceMode=1&PlaceQuantity=&InsuranceSumm=0&Drivers%5B0%5D%5BID%5D=1&Drivers%5B0%5D%5BAge%5D=50&Drivers%5B0%5D%5BExp%5D=20&Drivers%5B0%5D%5BGender%5D=1&Drivers%5B0%5D%5BMarriage%5D=1&Drivers%5B0%5D%5BChildren%5D=2&StealDamageVariant=N&DamageVariant=" + ((form.InsuranceMode == "2") ? "Y" : "N") + "&StealKeyDamageVariant=" + ((form.InsuranceMode == "0") ? "Y" : "N") + "&StealTotalDamageVariant=N&RegionISN=3783&RegionName=%D0%9C%D0%9E%D0%A1%D0%9A%D0%92%D0%90%2C+%D0%93%D0%9E%D0%A0%D0%9E%D0%94%2C+%D0%9C%D0%9E%D0%A1%D0%9A%D0%92%D0%90+%D0%93\"},{\"Key\":\"agr2\",\"Value\":\"0\"}]}";
            return result;
        }

        public string GetPrice(CASCOForm form)
        {
            throw new NotImplementedException();
        }

        private string GetIngosOsagoPrice(bool isPhysical, int power, bool isNewCar, bool isDomesticCar, Driver[] drivers)
        {
            string vsvalue;
            string ingosResponse;
            string price;
            using (WebClient client = new WebClient())
            {

                string response = client.DownloadString("http://old.ingos.ru/ru/private/auto/osago/calc/iframe/?v4=1");
                var cookie = client.ResponseHeaders[HttpResponseHeader.SetCookie];

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(response);
                var viewstate = doc.GetElementbyId("__VIEWSTATE");
                vsvalue = viewstate.GetAttributeValue("value", "");

                client.Headers.Add(HttpRequestHeader.Cookie, cookie);
                byte[] response2 = client.UploadValues("http://old.ingos.ru/ru/private/auto/osago/calc/iframe/?v4=1", new NameValueCollection()
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
                    { "owner", "1" },
                    { "t_power", "75" },
                    { "i_mode", "USGENERALLMODEUSE" },
                    { "Domestic", "on" },
                    { "NewCar", "on" },
                    { "d_disc", "Y" },
                    { "d_age1", "21|2" },
                    { "d_age2", "21|2" },
                    { "d_age3", "21|2" },
                    { "d_age", "21|2" },
                    { "d_age", "21|2" },
                    { "i_regionValue", "" },
                    { "i_region", "" },
                    { "", "ctl00$BXFullContent1$Calc$Calc$Calc$feedbackcomponent$feedbackcomponent$feedbackcomponent" },
                    { "", "ctl00$BXFullContent1$Calc$Calc$Calc" },
                    { "__VIEWSTATEGENERATOR", "1FD4AAAB" },
                    { "__CALLBACKID", "ctl00$BXFullContent1$Calc$Calc$Calc" },
                    { "__CALLBACKPARAM", GenerateIngosCallbackParamOsago(isPhysical, power, isNewCar, isDomesticCar, drivers) }
                });

                ingosResponse = System.Text.Encoding.UTF8.GetString(response2);
                ingosResponse = ingosResponse.Remove(0, 2);
                Dictionary<string, object> values = JsonConvert.DeserializeObject<Dictionary<string, object>>(ingosResponse);
                price = values["Prem"].ToString();

                //TODO: rework this HELL
                NumberFormatInfo nfi = new CultureInfo("ru-RU", false).NumberFormat;
                nfi.NumberDecimalDigits = 0;
                var res = price;
                var indexOfComa = (res.IndexOf('.') < 0) ? res.IndexOf(',') : res.IndexOf('.');
                var firstPart = Int32.Parse(res.Substring(0, indexOfComa));
                var secondPart = Int32.Parse(res.Substring(indexOfComa + 1, res.Length - indexOfComa - 1));
                var secondString = secondPart.ToString();
                secondString = (secondString.Length < 2) ? secondString + "0" : secondString;
                secondString = (secondString.Length < 2) ? secondString + "0" : secondString;
                price = firstPart.ToString("N", nfi) + "," + secondString;// + " ₽";
            }

            return price;
        }

        private string GenerateIngosCallbackParamOsago(bool isPhysical, int power, bool isNewCar, bool isDomesticCar, Driver[] drivers)
        {
            var driverString = "";
            for (int i = 0; i < drivers.Length; i++)
            {
                driverString += "&Drivers%5B" + i.ToString() + "%5D%5BYears%5D=";
                driverString += drivers[i].age.ToString();
                //switch (drivers[i].age)
                //{
                //    case "1":
                //        driverString += "21";
                //        break;
                //    case "2":
                //        driverString += "23";
                //        break;
                //    case "3":
                //        driverString += "23";
                //        break;
                //    case "4":
                //        driverString += "23";
                //        break;
                //    default:
                //        driverString += "23";
                //        break;
                //}
                driverString += "&Drivers%5B" + i.ToString() + "%5D%5BDriver%5D=";
                driverString += drivers[i].experience.ToString();
                //switch (drivers[i].experience)
                //{
                //    case "1":
                //        driverString += "2";
                //        break;
                //    case "2":
                //        driverString += "2";
                //        break;
                //    case "3":
                //        driverString += "4";
                //        break;
                //    case "4":
                //        driverString += "4";
                //        break;
                //    default:
                //        driverString += "2";
                //        break;
                //}
            }
            string result = "{\"MethodName\":\"OSAGO_Calc\",\"Parameters\":[{\"Key\":\"agr1\",\"Value\":\"";
            result += "owner_1=";
            result += (isPhysical) ? "1" : "0";
            result += "&owner_2=";
            result += (!isPhysical) ? "1" : "0";
            result += "&t_type=1&t_power=";
            result += power.ToString();
            result += "&d_disc=";
            result += (isPhysical) ? "Y" : "N";
            result += "&i_mode=USGENERALLMODEUSE&i_period=12&i_use=12&i_usewithtrailer=0&i_region=%D0%9C%D0%9E%D0%A1%D0%9A%D0%92%D0%90%2C+%D0%93%D0%9E%D0%A0%D0%9E%D0%94%2C+%D0%9C%D0%9E%D0%A1%D0%9A%D0%92%D0%90+%D0%93&i_region_value=3783";
            result += (isPhysical) ? driverString : "&Drivers=null";
            result += "&DriversCount=";
            result += (isPhysical) ? drivers.Length.ToString() : "0";
            result += "&NewCar=";
            result += (isNewCar) ? "1" : "0";
            result += "&Domestic=";
            result += (isDomesticCar) ? "1" : "0";
            result += "\"}]}";

            return result;
        }

    }
}
