using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.ACCIDENTCalcService
{
    public interface IACCIDENTCalcService
    {
        IEnumerable<IACCIDENTCalc> Calcs { get; set; }

        ACCIDENTOffers GetOffers(ACCIDENTForm model);
    }
}
