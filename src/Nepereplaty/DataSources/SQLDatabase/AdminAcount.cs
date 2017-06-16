using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase
{
    public class AdminAcount
    {
        [Key]
        public int id { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }
}
