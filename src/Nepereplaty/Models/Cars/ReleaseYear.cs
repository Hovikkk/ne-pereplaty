using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.Cars
{
    public class ReleaseYear
    {
        public int Year { get; set; }
        public Brand[] Brands { get; set; }
    }
}
