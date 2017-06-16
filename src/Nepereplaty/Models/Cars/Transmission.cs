using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.Cars
{
    public class TransmissionOption
    {
        public string text;
        public string value;
    }
    public class Transmission
    {
        public object Code { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public CarDetails Details { get; set; }
    }
}
