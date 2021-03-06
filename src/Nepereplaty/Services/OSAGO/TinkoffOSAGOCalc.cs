﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Nepereplaty.Models.OSAGOCalcService;

namespace Nepereplaty.Services.OSAGO
{
    public class TinkoffOSAGOCalc : IOSAGOCalc
    {
        public InsuracneCompany Company { get; set; }

        public TinkoffOSAGOCalc()
        {
            Company = new InsuracneCompany();
            Company.Id = 1;
            Company.Logo = "/i/partners/logo3.png";
            Company.Name = "Тинькофф";
        }

        public OSAGOOffer GetOffer(OSAGOForm form)
        {
            OSAGOOffer result = getDefaultOfffer();
            result.Price = GetPrice(form);

            return result;
        }

        public string GetPrice(OSAGOForm form)
        {
            var driversMinAge = form.drivers.Min(d => d.age);
            var minEexpQuery = form.drivers.Min(d => d.experience);

            return GetTinkoffPrice(form);
        }

        private OSAGOOffer getDefaultOfffer()
        {
            OSAGOOffer defaultOfffer = new OSAGOOffer();
            defaultOfffer.Company = Company;
            defaultOfffer.Name = "Полис1";
            defaultOfffer.AntiTheftSystem = "не требуется";
            defaultOfffer.Description = "Какое-то описание для этой страховки";
            defaultOfffer.IsShown = false;
            defaultOfffer.AdditionalOptions = new AdditionalOption[5];
            defaultOfffer.AdditionalOptions[0] = new AdditionalOption() { Name = "Гражданская ответственость за повреждение имущества", Description = "до 40 000 руб" };
            defaultOfffer.AdditionalOptions[1] = new AdditionalOption() { Name = "Гражданская ответственность за ущерб жизни и здоровью", Description = "до 50 000 руб" };
            defaultOfffer.AdditionalOptions[2] = new AdditionalOption() { Name = "Услуги аварийного комиссара", Description = "" };
            defaultOfffer.AdditionalOptions[3] = new AdditionalOption() { Name = "Сбор справок", Description = "" };
            defaultOfffer.AdditionalOptions[4] = new AdditionalOption() { Name = "Эвакуация автомобиля", Description = "" };

            return defaultOfffer;
        }
        
        private string GetTinkoffPrice(OSAGOForm form)
        {

           
            var responseValue = string.Empty;

            string example = "{\"Calculator\":[{\"ProductName\":\"AutoOldVehicleBox\",\"DriversCount\":\"one\",\"TermType\":\"monthly\",\"IsSeriousViolations\":\"false\",\"IsTransitForRegistration\":false,\"IsTransitForTechInspection\":false,\"IsUnlimitedDrivers\":\"false\",\"PrimaryUseCountry\":\"RU\",\"EffectiveDate\":\"2015-09-12\",\"ExpirationDate\":\"2016-09-09\",\"QuickIsPerson\":true,\"DriversListType\":\"unnamed\",\"PaymentsCode\":\"1payment\",\"Vehicles\":[{\"EngineHorsepower\":265,\"Category\":\"B\",\"ChangeNumAgg\":\"no\",\"GroupId\":\"104\",\"IsNewVehicle\":\"no\",\"Make\":\""+form.brand+"\",\"MaxAllowedWeight\":1,\"Model\":\""+form.model+ "\",\"Modification\":\"ML350 BlueTEC 4Matic Osobaya seria\",\"NumberOfSeats\":4,\"VehicleUsage\":\"personal\",\"VehicleUseRegion\":\"77\",\"Year\":"+form.year+",\"RenewalOption\":\"standart\",\"VehicleType\":\"Легковые автомобили\",\"VehicleTypeCode\":\"2\",\"InsuranceTerritory\":\"Russia\",\"VehicleID\":1,\"IsKeyless\":\"no\",\"IsOSAGOMultidrive\":false,\"QuickPrimaryUseRegion\":\"77\",\"VehicleCost\":" + form.carCost + ",\"OSAGO.EffectiveDate\":\"2015-09-12\",\"OSAGO.ExpirationDate\":\"2016-09-09\",\"OSAGO.IsTransitForRegistration\":false,\"OSAGO.IsTransitForTechInspection\":false,\"OSAGO.TermType\":\"Annual\",\"VehicleMarkModelRAMICode\":\"230008737\",\"VehicleMarkModelCode\":\"15818\"}],\"QuickAge\":21,\"QuickExperience\":3,\"QuickCity\":\"Москва\",\"QuickPrimaryUseRegion\":\"77\",\"ProductOptions\":[{\"KSK_TheftLimit_TOI\":" + form.carCost+ ",\"KSK_DamageLimit_TOI\":" + form.carCost + ",\"KSK_Damage_TOI\":1,\"KSK_DamageTotal_TOI\":true,\"KSK_Theft_TOI\":1,\"KSK_FULLDamage\":true,\"VehicleID\":1}]}],\"Settings\":{\"subject\":\"auto\",\"view\":\"\",\"view-name\":\"auto\",\"contact\":{\"FirstName\":\"Йййй\",\"MobilePhone\":\"70000000000\"},\"vehicles\":[{\"region\":{\"Name\":\"Москва и Московская область\",\"Id\":77},\"year\":{\"Name\":\"2015\",\"Id\":2015},\"maker\":{\"Code\":null,\"Id\":53,\"Name\":\"Mercedes-Benz\"},\"model\":{\"Code\":null,\"Id\":525,\"Name\":\"M-class\"},\"case\":{\"Code\":null,\"Id\":\"Универсал(5 дв.)\",\"Name\":\"Универсал(5 дв.)\"},\"engine\":{\"Code\":null,\"Id\":\"3.0 CDI(265.00 л.с.)\",\"Name\":\"3.0 CDI(265.00 л.с.)\"},\"transmission\":{\"Code\":null,\"Id\":\"Автоматическая\",\"Name\":\"Автоматическая\"},\"cost\":{\"Id\":\"100000\",\"Name\":\"100 000\",\"Default\":0},\"extra\":{\"Id\":15818,\"Model\":\"M-class\",\"Modification\":\"ML350 BlueTEC 4Matic Osobaya seria\",\"EnginePower\":\"265.00\",\"EnginePowerKWt\":\"195.00\",\"EngineCapacity\":\"2987.00\",\"Price\":0,\"GroupId\":\"104\",\"EngineType\":\"3.0 CDI(265.00 л.с.)\",\"EngineTypeCode\":null,\"RsaCode\":\"230008737\"}}],\"boxes\":[\"AutoOldVehicleBox\"],\"constructor\":true,\"vehicleAge\":0}}";

            ThinkoffRequest values = JsonConvert.DeserializeObject<ThinkoffRequest>(example);
            values.Calculator[0].QuickAge = form.drivers.Min(d => d.age);
            values.Calculator[0].QuickExperience = form.drivers.Min(d => d.experience);
            values.Calculator[0].Vehicles[0]["EngineHorsepower"] = form.power;
            string postData = JsonConvert.SerializeObject(values);

            var request = (HttpWebRequest)WebRequest.Create("https://www.tinkoffinsurance.ru/api/AutoCalculator/quick/");
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
            ThinkoffResponse result = JsonConvert.DeserializeObject<ThinkoffResponse>(responseValue);

            //TODO: rework this HELL
            NumberFormatInfo nfi = new CultureInfo("ru-RU", false).NumberFormat;
            nfi.NumberDecimalDigits = 0;
            var res = result.Result[0].VehicleOSAGOQuoteInfo[0]["totalCostField"];
            var indexOfComa = (res.IndexOf('.') < 0) ? res.IndexOf(',') : res.IndexOf('.');
            var firstPart = Int32.Parse(res.Substring(0, indexOfComa));
            var secondPart = Int32.Parse(res.Substring(indexOfComa + 1, res.Length - indexOfComa - 1));
            var secondString = secondPart.ToString();
            secondString = (secondString.Length < 2) ? secondString + "0" : secondString;
            secondString = (secondString.Length < 2) ? secondString + "0" : secondString;
            string resultString = firstPart.ToString("N", nfi) + "," + secondString;// + " ₽";

            return resultString;
        }

        private class ThinkoffRequest
        {
            public ThinkoffCalculator[] Calculator { get; set; }
            public object Settings { get; set; }
        }

        private class ThinkoffCalculator
        {
            public object ProductName { get; set; }
            public object DriversCount { get; set; }
            public object TermType { get; set; }
            public object IsSeriousViolations { get; set; }
            public object IsTransitForRegistration { get; set; }
            public object IsTransitForTechInspection { get; set; }
            public object IsUnlimitedDrivers { get; set; }
            public object PrimaryUseCountry { get; set; }
            public object EffectiveDate { get; set; }
            public object ExpirationDate { get; set; }
            public object QuickIsPerson { get; set; }
            public object DriversListType { get; set; }
            public object PaymentsCode { get; set; }
            public Dictionary<string, object>[] Vehicles { get; set; }
            public int QuickAge { get; set; }
            public int QuickExperience { get; set; }
            public object QuickCity { get; set; }
            public object QuickPrimaryUseRegion { get; set; }
            public object ProductOptions { get; set; }

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
            public Dictionary<string, string>[] VehicleOSAGOQuoteInfo { get; set; }
            public object VehicleTechnicalMaintenance { get; set; }
            public object TotalCost { get; set; }
            public object TotalCoveredAmount { get; set; }
            public object Coverages { get; set; }
            public object DiscountInfo { get; set; }
            public object NonDiscountedPremium { get; set; }
            public object UnderwritingIssues { get; set; }
        }
    }
}
