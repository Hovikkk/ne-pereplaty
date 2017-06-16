using System.Collections.Generic;

namespace Nepereplaty.Models.OSAGOCalcService
{
    public interface IOSAGOCalcService
    {
        IEnumerable<IOSAGOCalc> Calcs { get; set; }

        OSAGOOffers GetOffers(OSAGOForm model);
    }
}