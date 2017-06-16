using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase.OfferModel
{
    public class Insured
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string surName { get; set; }
        public string middleName { get; set; }
        public string age { get; set; }
    }
}
