using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.OfferModel
{
    public class AccidentOfferModel
    {
        public long offerId { get; set; }
        public InsuredModel insured { get; set; }
        public bool isSelf { get; set; }
        public bool amateurSports { get; set; }
        public long duration { get; set; }
    }
}
