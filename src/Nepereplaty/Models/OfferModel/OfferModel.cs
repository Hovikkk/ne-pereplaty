using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.OfferModel
{
    public class OfferModel
    {
        public long offerId { get; set; }
        public string type { get; set; }
        public long dataId { get; set; }
        public long cost { get; set; }
        [DataType(DataType.Date)]
        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTime? startDate { get; set; }
        [DataType(DataType.Date)]
        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTime? endDate { get; set; }

        public InsuredModel buyer { get; set; }

        public string comments { get; set; }
    }
}
