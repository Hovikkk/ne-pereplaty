using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.TRAVELINGCaclService
{
    public interface ITRAVELINGCalcService
    {
        IEnumerable<ITRAVELINGCalc> Calcs { get; set; }

        TRAVELINGOffers GetOffers(TRAVELINGForm model);
    }
}
