using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.OfferModel
{
    public class TravelingOfferModel
    {
        public long offerID { get; set; }
        public long type { get; set; }
        public string[] countries { get; set; }
        public InsuredModel[] insureds { get; set; }
        public long duration { get; set; }
    }

    public class InsuredModel
    {
        public string name { get; set; }
        public string surName { get; set; }
        public string middleName { get; set; }
        public string age { get; set; }
    }
}
