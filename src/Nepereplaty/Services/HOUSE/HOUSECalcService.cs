using Nepereplaty.Models.HOUSECalcService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Services.HOUSE
{
    public class HOUSECalcService : IHOUSECalcService
    {
        public IEnumerable<IHOUSECalc> Calcs { get; set;}

        public HOUSECalcService()
        {
            var calcs = new IHOUSECalc[1];
            calcs[0] = new VTBHOUSECalc();
            //calcs[1] = new IngosHOUSECalc();
            //calcs[0] = new TinkoffCASCOCalc();
            //calcs[1] = new TinkoffCASCOCalc();
            Calcs = calcs;
        }
        public HOUSEOffers GetOffers(HOUSEForm model)
        {
            HOUSEOffers result = new HOUSEOffers();
            result.startData = model.startData.ToString("dd.MM.yyyy");
           
            result.endData = model.startData.AddYears(1).ToString("dd.MM.yyyy");
            result.AdditionalStructures = model.AdditionalStructures;
            result.Offers = Calcs.Select(k => k.GetOffer(model)).ToArray();
            return result;
        }


    }
}
