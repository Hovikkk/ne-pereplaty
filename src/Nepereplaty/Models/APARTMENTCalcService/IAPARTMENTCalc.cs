using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.APARTMENTCalcService
{
    public interface IAPARTMENTCalc
    {
        InsuracneCompany Company { get; set; }

        APARTMENTOffer GetOffer(APARTMENTForm form);
        string GetPrice(APARTMENTForm form);
    }
}
