using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase.OfferModel
{
    public class Driver
    {
        [Key]
        public int id { get; set; }
        public long age { get; set; }
        public long experience { get; set; }
        public bool isMale { get; set; }
        public long kids { get; set; }
        public long martialStatus { get; set; }
    }
}
