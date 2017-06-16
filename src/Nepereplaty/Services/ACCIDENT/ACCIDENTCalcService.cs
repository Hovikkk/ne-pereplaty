using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.ACCIDENTCalcService;
using Nepereplaty.Models.HOUSECalcService;

namespace Nepereplaty.Services.ACCIDENT
{
    public class ACCIDENTCalcService : IACCIDENTCalcService
    {

        public ACCIDENTCalcService()
        {
            var calcs = new IACCIDENTCalc[2];
            calcs[0] = new VTBACCIDENTCalc();
            calcs[1] = new IngosACCIDENTCalc();
            //calcs[1] = new VTBACCIDENTCalc();
            //           calcs[0] = new TinkkofACCIDENT();
            //calcs[1] = new TinkoffCASCOCalc();
            Calcs = calcs;
        }
        public IEnumerable<IACCIDENTCalc> Calcs { get; set; }

        public ACCIDENTOffers GetOffers(ACCIDENTForm model)
        {
            ACCIDENTOffers result = new ACCIDENTOffers();
            result.startData = model.startData.ToString("dd'.'MM'.'yyyy");
            result.endData = model.startData.AddMonths(model.duration).ToString("dd'.'MM'.'yyyy");
            result.age = model.age;
            result.amateurSports = model.amateurSports;
            result.duration = model.duration;
            result.otherPerson = model.otherPerson;
            result.Offers = Calcs.Select(k => k.GetOffer(model)).ToArray();
            return result;
        }
    }
}
