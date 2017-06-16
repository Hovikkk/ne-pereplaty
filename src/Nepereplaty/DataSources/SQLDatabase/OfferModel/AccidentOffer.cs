using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase.OfferModel
{
    public class AccidentOffer
    {
        [Key]
        public long offerId { get; set; }
        public string insured { get; set; }
        public bool isSelf { get; set; }
        public bool amateurSports { get; set; }
        public long duration { get; set; }
    }
}
