using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase.OfferModel
{
    public class TravelingOffer
    {
        [Key]
        public long offerID { get; set; }
        public long type { get; set; }
        public string countries { get; set; }
        public string insureds { get; set; }
        public long duration { get; set; }
    }

    
}
