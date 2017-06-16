using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.APARTMENTCalcService;

namespace Nepereplaty.Services.APARTMENT
{
    public class VTBAPARTMENTCalc : IAPARTMENTCalc
    {
        public InsuracneCompany Company { get; set; }
        public VTBAPARTMENTCalc()
        {
            Company = new InsuracneCompany();
            Company.Id = 3;
            Company.Logo = "/i/partners/vtb.png";
            Company.Name = "ВТБ";
        }

        private APARTMENTOffer getDefaultOfffer()
        {
            APARTMENTOffer defaultOfffer = new APARTMENTOffer();
            defaultOfffer.Company = Company;
            defaultOfffer.Name = "Полис ВТБ Страхование";
            defaultOfffer.AdditionalOptions = new AdditionalOption[5];
            defaultOfffer.AdditionalOptions[0] = new AdditionalOption() { Name = "параметр 1", Description = "до 40 000 руб" };
            defaultOfffer.AdditionalOptions[1] = new AdditionalOption() { Name = "параметр 2", Description = "до 50 000 руб" };
            defaultOfffer.AdditionalOptions[2] = new AdditionalOption() { Name = "параметр 3", Description = "" };
            defaultOfffer.AdditionalOptions[3] = new AdditionalOption() { Name = "параметр 4", Description = "" };
            defaultOfffer.AdditionalOptions[4] = new AdditionalOption() { Name = "параметр 5", Description = "" };

            return defaultOfffer;
        }

        public APARTMENTOffer GetOffer(APARTMENTForm form)
        {
            APARTMENTOffer result = getDefaultOfffer();
            /*      var registers = {
                  'tariffs': {
                      'construct': 0.0012,
                      'inside': 0.0038,
                      'movable': 0.005
                  },
                  'pl_sp': {
                      0: 0,
                      200000: 1200,
                      500000: 2500,
                      1000000: 3900
                  },
                  'ai_sp': {
                      0: 0,
                      3000000: 980,
                      6000000: 1900
                  },
                  "kLength": {
                      "3": 0.4,
                      "4": 0.5,
                      "5": 0.6,
                      "6": 0.7,
                      "7": 0.75,
                      "8": 0.8,
                      "9": 0.85,
                      "10": 0.9,
                      "11": 0.95,
                      "12": 1
                  }
              };
              */




            //из вебсервисов в data.logic.results передается []. А это должно быть объектом.
            //По идее, он тут как раз должен заполняться заново - по этому его обнуление ничего поломать не должно.
            //И нужно будет рассчитать и применить коэффициент за срок страхования, согласно методике.
        double kLength = 1;
        double min_prop_total_sp = 500;
		
		double krent = (form.rent)?1.5 : 1;

            // костыль, копипаст, см. https://avinfors.ru:1000/issues/3725
            // при вызове калькулятора из разных мест sconto передается в разных полях и в разных форматах
        double sconto = 1;

            // Дополнительные риски
            //		var rt = registers.tariffs;  // Базовые тарифы

            //var c = cd.construct;

            double c_ss = 0;
            double c_sp = c_ss* 0.0012 * kLength ;  // Конструктивные элементы

            double i_ss = form.sum*0.7;
            double i_sp = i_ss* 0.0038 * kLength ;  // Внутренняя отделка


            double m_ss = form.sum * 0.3;
            double m_sp = m_ss* 0.005 * kLength* krent;  // Домашнее имущество

            result.Total_SS = (float)(c_ss + i_ss + m_ss); //Сумма страховых сумм по имуществу    

		    result.Total_SP = (float)(c_sp + i_sp + m_sp); //Сумма страховых премий по имуществу (не включая и включая доп. опции)

            return result;

        }

        public string GetPrice(APARTMENTForm form)
        {
            throw new NotImplementedException();
        }
    }
}
