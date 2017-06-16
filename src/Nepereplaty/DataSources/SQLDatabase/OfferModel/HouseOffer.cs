using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase.OfferModel
{
    public class HouseOffer
    {
        [Key]
        public long offerID { get; set; }
        public string region { get; set; }
        public string city { get; set; }
        public string address { get; set; }

    }
}
