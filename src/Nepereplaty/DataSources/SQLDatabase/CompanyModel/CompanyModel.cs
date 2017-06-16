using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase.CompanyModel
{
    public class Company
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string contactName { get; set; }
        public string address { get; set; }
        public string telephone { get; set; }
        public string email { get; set; }
        public string insurances { get; set; }
        public string comments { get; set; }
    }

    
}
