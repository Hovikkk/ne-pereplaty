using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.ACCIDENTCalcService;
using Newtonsoft.Json;

namespace Nepereplaty.Services.ACCIDENT
{

    public class VTBACCIDENTCalc : IACCIDENTCalc
    {
        public InsuracneCompany Company { get; set; }
        public string regJson = " { \"kIpCount\":{ \"code\":\"kIpCount\", \"name\":\"Коэффициент за количество застрахованных\", \"version\":1, \"items\":[{\"from\":1,\"to\":4,\"val\":1},{\"from\":5,\"to\":15,\"val\":0.9},{\"from\":16,\"to\":30,\"val\":0.875},{\"from\":31,\"to\":50,\"val\":0.85}]},\"productType\":{\"1\":{\"hospital\":{\"no\":{\"ss\":{\"50000\":{\"insuredPeriod\":{\"1\":[124,139,174],\"3\":[244,279,344],\"6\":[424,484,604],\"12\":[604,689,864]}},\"150000\":{\"insuredPeriod\":{\"1\":[374,414,519],\"3\":[734,829,1034],\"6\":[1274,1449,1809],\"12\":[1814,2069,2589]}},\"300000\":{\"insuredPeriod\":{\"1\":[724,829,1034],\"3\":[1449,1654,2069],\"6\":[2534,2898,3624],\"12\":[3624,4139,5174]}},\"500000\":{\"insuredPeriod\":{\"1\":[1209,1379,1724],\"3\":[2414,2759,3449],\"6\":[4229,4829,6039],\"12\":[6039,6899,8624]}},\"1000000\":{\"insuredPeriod\":{\"12\":[11974,13699,17149]}}}},\"yes\":{\"ss\":{\"50000\":{\"insuredPeriod\":{\"1\":[144,169,209],\"3\":[289,334,419],\"6\":[509,584,729],\"12\":[729,834,1044]}},\"150000\":{\"insuredPeriod\":{\"1\":[439,499,624],\"3\":[874,999,1249],\"6\":[1534,1749,2189],\"12\":[2189,2499,3129]}},\"300000\":{\"insuredPeriod\":{\"1\":[874,999,1249],\"3\":[1749,1999,2499],\"6\":[3064,3499,4379],\"12\":[4379,4999,6254]}},\"500000\":{\"insuredPeriod\":{\"1\":[1459,1669,2084],\"3\":[2919,3334,4169],\"6\":[5105,5834,7294],\"12\":[7294,8339,10419]}},\"1000000\":{\"insuredPeriod\":{\"12\":[14489,16574,20742]}}}}}},\"2\":{\"hospital\":{\"no\":{\"ss\":{\"50000\":{\"insuredPeriod\":{\"1\":[124,139,174],\"3\":[244,279,344],\"6\":[424,484,604],\"12\":[604,689,864]}},\"300000\":{\"insuredPeriod\":{\"1\":[724,829,1034],\"3\":[1449,1654,2069],\"6\":[2534,2898,3624],\"12\":[3624,4139,5174]}},\"500000\":{\"insuredPeriod\":{\"1\":[1209,1379,1724],\"3\":[2414,2759,3449],\"6\":[4229,4829,6039],\"12\":[6039,6899,8624]}},\"1000000\":{\"insuredPeriod\":{\"12\":[11974,13699,17149]}},\"2000000\":{\"insuredPeriod\":{\"12\":[24049,27499,34399]}},\"3000000\":{\"insuredPeriod\":{\"12\":[36124,41299,51649]}}}},\"yes\":{\"ss\":{\"50000\":{\"insuredPeriod\":{\"1\":[144,169,209],\"3\":[289,334,419],\"6\":[509,584,729],\"12\":[729,834,1044]}},\"300000\":{\"insuredPeriod\":{\"1\":[874,999,1249],\"3\":[1749,1999,2499],\"6\":[3064,3499,4379],\"12\":[4379,4999,6254]}},\"500000\":{\"insuredPeriod\":{\"1\":[1459,1669,2084],\"3\":[2919,3334,4169],\"6\":[5105,5834,7294],\"12\":[7294,8339,10419]}},\"1000000\":{\"insuredPeriod\":{\"12\":[14489,16574,20742]}},\"2000000\":{\"insuredPeriod\":{\"12\":[29079,33249,41584]}},\"3000000\":{\"insuredPeriod\":{\"12\":[43669,49924,62429]}}}}}},\"3\":{\"hospital\":{\"no\":{\"ss\":{\"500000\":{\"insuredPeriod\":{\"6\":[13294,14484,16924],\"12\":[18989,20689,24179]}},\"1000000\":{\"insuredPeriod\":{\"6\":[18614,20279,23694],\"12\":[26589,28969,33849]}},\"1500000\":{\"insuredPeriod\":{\"6\":[23924,26069,30464],\"12\":[34179,37239,43519]}}}},\"yes\":{\"ss\":{\"500000\":{\"insuredPeriod\":{\"6\":[16049,17499,20439],\"12\":[22929,24999,29199]}},\"1000000\":{\"insuredPeriod\":{\"6\":[22469,24499,28614],\"12\":[32099,34999,40879]}},\"1500000\":{\"insuredPeriod\":{\"6\":[28889,31499,36789],\"12\":[41269,44999,52559]}},\"3000000\":{\"insuredPeriod\":{\"6\":[48089,52499,61319],\"12\":[68699,74999,87599]}}}}}}}}";
        public dynamic reg;
        public VTBACCIDENTCalc()
        {
            Company = new InsuracneCompany();
            Company.Id = 3;
            Company.Logo = "/i/partners/vtb.png";
            Company.Name = "ВТБ";
            reg = JsonConvert.DeserializeObject(regJson);
        }
        private ACCIDENTOffer getDefaultOfffer()
        {
            ACCIDENTOffer defaultOfffer = new ACCIDENTOffer();
            defaultOfffer.Company = Company;
            defaultOfffer.Name = "ВТБ Страхование";
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
            ACCIDENTOffer results = getDefaultOfffer();
            results.Company = Company;
            dynamic st =  reg["productType"]["1"]["hospital"]["no"];


            string key1 = (form.age > 17) ? "2" : "1";
            string key2 = form.duration.ToString();
            int key3 = (form.amateurSports) ? 2 : 0;
            results.Total_SS =(key1=="1")?150000:300000;
            dynamic part1 = reg["productType"][key1]["hospital"]["yes"]["ss"];
            dynamic part2 = part1[results.Total_SS.ToString()]["insuredPeriod"];
            dynamic part3 = part2[key2];
            results.Total_SP = part3[key3];
          
            return results;
        }

        public string GetPrice(ACCIDENTForm form)
        {
            throw new NotImplementedException();
        }
    }
}
