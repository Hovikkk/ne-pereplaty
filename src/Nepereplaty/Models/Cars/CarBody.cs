using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.Cars
{
    public class CarBodyOption
    {
        public string value;
        public string text;

    }
    public class CarBody
    {
        public object Code { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public Modification[] Modifications { get; set; }
    }
}
