using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.TRAVELINGCaclService
{
   public  interface ITRAVELINGCalc
    {
        InsuracneCompany Company { get; set; }

        TRAVELINGOffer GetOffer(TRAVELINGForm form);
        string GetPrice(TRAVELINGForm form);
    }
}
