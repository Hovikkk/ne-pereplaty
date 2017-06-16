using System.Collections.Generic;

namespace Nepereplaty.Models.HOUSECalcService
{
    public interface IHOUSECalcService
    {
        IEnumerable<IHOUSECalc> Calcs { get; set; }

        HOUSEOffers GetOffers(HOUSEForm model);
    }
}
