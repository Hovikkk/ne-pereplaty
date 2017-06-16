using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.HOUSECalcService
{
    public class HOUSEOffers
    {
        public string startData { get; set; }
        public string endData { get; set; }
        public string AdditionalStructures { get; set; }
        public string InsuranceType { get; set; }
        public HOUSEOffer[] Offers { get; set; }
    }
}
