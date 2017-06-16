using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.OfferModel
{
    public class CascoOfferModel
    {
        public long offerId { get; set; }
        public Driver[] drivers { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public string carBody { get; set; }
    }

    public class Driver
    {
        public long age { get; set; }
        public long experience { get; set; }
        public bool isMale { get; set; }
        public long kids { get; set; }
        public long martialStatus { get; set; }
    }
}
