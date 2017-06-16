using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase.OfferModel
{
    public class CascoOffer
    {
        [Key]
        public long offerId { get; set; }
        public string drivers { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public string carBody { get; set; }
    }

    
}
