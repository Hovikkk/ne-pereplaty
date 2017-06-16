using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.APARTMENTCalcService
{
    public interface IAPARTMENTCalcService
    {
        IEnumerable<IAPARTMENTCalc> Calcs { get; set; }

        APARTMENTOffers GetOffers(APARTMENTForm model);
    }
}
