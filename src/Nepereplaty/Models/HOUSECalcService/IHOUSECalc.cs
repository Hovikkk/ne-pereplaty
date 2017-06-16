using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.HOUSECalcService
{
    public interface IHOUSECalc
    {
        InsuracneCompany Company { get; set; }

        HOUSEOffer GetOffer(HOUSEForm form);
        string GetPrice(HOUSEForm form);
    }
}
