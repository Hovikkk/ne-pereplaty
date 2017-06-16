using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.ACCIDENTCalcService
{
    public interface IACCIDENTCalc
    {
        InsuracneCompany Company { get; set; }

        ACCIDENTOffer GetOffer(ACCIDENTForm form);
        string GetPrice(ACCIDENTForm form);
    }
}
