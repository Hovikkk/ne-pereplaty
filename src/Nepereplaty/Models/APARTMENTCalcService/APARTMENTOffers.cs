using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.APARTMENTCalcService
{
    public class APARTMENTOffers
    {
        public string startData { get; set; }
        public string endData { get; set; }
        public string InsuranceType { get; set; }
        public APARTMENTOffer[] Offers { get; set; }
    }
}
