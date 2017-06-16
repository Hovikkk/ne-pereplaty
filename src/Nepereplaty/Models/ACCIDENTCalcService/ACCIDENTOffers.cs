using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.ACCIDENTCalcService
{
    public class ACCIDENTOffers
    {
        public ACCIDENTOffer[] Offers { get; set; }
        public string startData { get; set; }
        public string endData { get; set; }
        public double duration { get; set; }
        public double age { get; set; }
        public bool amateurSports { get; set; }
        public bool otherPerson { get; set; }
    }
}
