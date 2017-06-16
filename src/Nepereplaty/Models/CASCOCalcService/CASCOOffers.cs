using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.CASCOCalcService
{
    public class CASCOOffers
    {
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
        public string startData { get; set; }
        public string endData { get; set; }
        public CASCOOffer[] Offers { get; set; }
    }
}
