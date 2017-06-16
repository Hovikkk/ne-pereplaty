using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.OSAGOCalcService
{
    public class OSAGOOffers
    {
        public string startData { get; set; }
        public string endData { get; set; }
        public string InsuranceType { get; set; }
        public string CarBrand { get; set; }
        public string CarModel { get; set; }
        public int CarReleaseYear { get; set; }
        public int DriversCount { get; set; }
        public int DriversMinAge { get; set; }
        public string Commissioner { get; set; }
        public string Evacuation { get; set; }
        public string TechSupport { get; set; }
        public string PoliceReference { get; set; }
        public OSAGOOffer[] Offers { get; set; }
    }
}
