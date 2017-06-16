using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.TRAVELINGCaclService
{
    public class TRAVELINGOffers
    {
        public TRAVELINGOffer[] Offers { get; set; }
        public string startData { get; set; }
        public string endData { get; set; }
        public double InsuranceType { get; set; }

        public Insured[] insureds { get; set; }
        public string insuredsCount { get; set; }
        public string insuredsAges { get; set; }
        public string country { get; set; }
        public string travelingDur { get; set; }
        
    }
}
