using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.Cars
{
    public class Region
    {
        public uint id { get; set; }
        public string title { get; set; }
    }
    public class RegionOption
    {
        public string value { get; set; }
        public string title { get; set; }
    }
}
