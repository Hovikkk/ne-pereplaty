using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.Cars
{
    public class ModificationOption
    {
        public string value;
        public string text;
    }
    public class Modification
    {
        public object Code { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public Transmission[] Transmissions { get; set; }
    }
}
