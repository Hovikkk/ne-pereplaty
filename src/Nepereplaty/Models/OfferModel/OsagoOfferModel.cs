using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.OfferModel
{
    public class OsagoOfferModel
    {
        public long offerId { get; set; }
        public Driver[] drivers { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public string carBody { get; set; }
    }
}
