using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase.CompanyModel
{
    public class Insurance
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string info { get; set; }
    }
}
