using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.TRAVELINGCaclService
{
    public class Insured
    {
        
        public Insured(string dateTime)
        {
            this.bd = dateTime;
        }

        public string bd { get; set; }
    }
}
