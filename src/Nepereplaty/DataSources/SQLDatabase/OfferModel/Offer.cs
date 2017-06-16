using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase.OfferModel
{
    public class Offer
    {
        [Key]
        public long offerId { get; set; }
        public string type { get; set; }
        public long dataId { get; set; }
        public float cost { get; set; }
        public long companyId { get; set; }
        public string startDate { get; set; }
       
        public string endDate { get; set; }

        public string buyer { get; set; }

        public string comments { get; set; }

        public bool purchas { get; set; }

        public DateTime? closeData { get; set; }

    }
}
