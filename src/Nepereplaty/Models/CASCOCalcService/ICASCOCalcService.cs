using System.Collections.Generic;

namespace Nepereplaty.Models.CASCOCalcService
{
    public interface ICASCOCalcService
    {
        IEnumerable<ICASCOCalc> Calcs { get; set; }

        CASCOOffers GetOffers(CASCOForm model);
    }
}