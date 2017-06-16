using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.HOUSECalcService;

namespace Nepereplaty.Services.HOUSE
{
    public class VTBHOUSECalc : IHOUSECalc
    {


        public InsuracneCompany Company { get; set; }
        public float[] additional = {0.0092f, 0.0057f, 0.0046f };

        public VTBHOUSECalc()
        {
            Company = new InsuracneCompany();
            Company.Id = 3;
            Company.Logo = "/i/partners/vtb.png";
            Company.Name = "ВТБ";
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
            defaultOfffer.Name = "Полис ВТБ Страхование";
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

       
         
        public HOUSEOffer GetRealOffer(HOUSEForm hf)
        {
            HOUSEOffer realOffer =  getDefaultOfffer();

            long kLength = 1;
            long min_prop_total_sp = 500;

            float kRentC = (hf.rent == "true") ? 1.1f : 1f;

            float kRentM = (hf.rent == "true") ? 1.5f : 1f;
            int buildYear = hf.year;
            var nowYear = DateTime.Today.Year;
            int c_ss = 700000;
            float c_sp;
            if ((+nowYear - 50) > buildYear || buildYear > (+nowYear))
            {
                c_sp = 0;
            }
            else
            {
                float c_sps = (hf.cover == "1")?0.0051f:0.0028f;
                c_sp = c_ss * c_sps * kRentC; // Конструктивные элементы
            };

            float rtX = 0;
            float asp = 0;
            float ass = 0;
            foreach (AdditionalStructure aS in hf.additionalStructure) { 
                int s_ss = aS.cost;

                float s_sp = s_ss * this.additional[int.Parse(aS.type)] * kRentC;
                asp += s_sp;
                ass += s_ss;
            }



            int m_ss = 300000;
            float m_sp = m_ss* 0.0075f * kRentM ;  // Домашнее имущество


            realOffer.Total_SS = c_ss + ass + m_ss; //Сумма страховых сумм по имуществу    
            realOffer.Total_SP = (c_sp + asp + m_sp); //Сумма страховых премий по имуществу (не включая и включая доп. опции)
		
		
		//Данные для опеределения оплаченных условий в доп. программах.
//		var insProgramOptions = {
//            "-": {damage: false, winter_package: false, liquid_spill: false, luxury: false},
 //           "Стандарт": {damage: false, winter_package: true, liquid_spill: false, luxury: false},
//            "Комфорт": {damage: true, winter_package: true, liquid_spill: true, luxury: false},
//            "Премиум": {damage: true, winter_package: true, liquid_spill: true, luxury: true}
//        };

    //определяю программу страхования на основе премии
 /*   var insProgram = "";
		if (res.prop_total_sp <= 0) {
			insProgram = "-"
		} else if (res.prop_total_sp< 10000) {
			insProgram = "Стандарт";
		} else if (res.prop_total_sp< 30000) {
			insProgram = "Комфорт";
		} else {
			insProgram = "Премиум";
		};
*/		
/*		//Опции, как они на форме (сказать Илье, чтобы передавал true|false ?)
		var opts = cd.options;

        var optsIn = insProgramOptions[insProgram]; //Опции, включенные в пакет по умолчанию.
		
		
		
		//Если нет объекта с доп. условиями и выбрана программа, значит это одна из плашек b2c и программа выбрана руками.
		if (Rc.isEmptyObj(opts) && cd.insProgram) {
			opts = insProgramOptions[cd.insProgram]; //Устанавливаю опции, которые входят в выбранную программу
			insProgram = cd.insProgram; //Перезаписываю переменную с рассчитанной программой той, что выбрана руками.
		};

		//Если объект с выбранными опциями пустой - нужно его заполнить значениями по умолчанию
		if (Rc.isEmptyObj(opts)) opts = Object.clone(optsIn);

		//Сравниваю рассчитанный набор опций и выбранный
		//Проставляю числовые значения: 0 - нет, 1 - да (руками), 2 - да (автоматически), 3 - нет (автоматически)
		for (var opt in optsIn) {
			if (optsIn[opt]) opts[opt] = 2; //Если включено в пакет
			if (!optsIn[opt] && opts[opt] == 1) opts[opt] = 1; //Если не включено в пакет и выбрано вручную
			if (!optsIn[opt] && opts[opt] != 1) opts[opt] = 0; //Если не включено в пакет и не выбрано вручную (т.е. выбрано автоматически, либо не выбрано)
			if (res.prop_total_sp <= 0) opts[opt] = 3; //Если СП по имуществу нулевая - запрещаю для выбора доп условия
		};
		if ( res.prop_total_ss <= 0 && opts.liquid_spill != 2) opts.liquid_spill = 3; //если не выбрано вн. отделка и движ. имущество - не доступно для ручного выбора
		if ( res.prop_total_ss <= 0 && opts.damage != 2) opts.damage = 3; //если не выбрано вн. отделка и движ. имущество - не доступно для ручного выбора
		*/
		//Рассчитываю премии по дополнительно выбранным опциями
		
		
		realOffer.Damage_SP = 0.0008f * realOffer.Total_SS;
            realOffer.Total_SP += realOffer.Damage_SP;
		
		
		realOffer.Liquid_Spill_SP = 0;

            realOffer.Liquid_Spill_SP = 0.0005f * (realOffer.Total_SS);
            realOffer.Total_SP += realOffer.Liquid_Spill_SP;

            /*		
                    realOffer.Luxury_SP = 0;
                        realOffer.Luxury_SP = 1500;
                        realOffer.Total_SP += realOffer.Luxury_SP;

            */



            // расчёт страховых премий по доп. рискам
            realOffer.Dop_Total_SP = 0;

		    var total = realOffer.Total_SP + realOffer.Dop_Total_SP; // Итого
            realOffer.Total_SP = total;
            return realOffer;
        }

        public string GetPrice(HOUSEForm form)
        {
            throw new NotImplementedException();
        }
    }
}
