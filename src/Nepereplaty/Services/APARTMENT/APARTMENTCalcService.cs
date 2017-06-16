using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.APARTMENTCalcService;

namespace Nepereplaty.Services.APARTMENT
{
    public class APARTMENTCalcService : IAPARTMENTCalcService
    {
        public IEnumerable<IAPARTMENTCalc> Calcs {get; set;}
        public APARTMENTCalcService()
        {
            var calcs = new IAPARTMENTCalc[1];
            calcs[0] = new VTBAPARTMENTCalc();
            //calcs[1] = new VTBAPARTMENTCalc();
            //calcs[1] = new IngosAPARTMENTCalc();
            Calcs = calcs;
        }
        public APARTMENTOffers GetOffers(APARTMENTForm model)
        {
            APARTMENTOffers result = new APARTMENTOffers();
            result.startData = model.startData.ToString("dd.MM.yyyy");
            result.endData = model.startData.AddYears(1).ToString("dd.MM.yyyy");
            //result.AdditionalStructures = model.AdditionalStructures;
            result.Offers = Calcs.Select(k => k.GetOffer(model)).ToArray();
            return result;
        }
    }
}
