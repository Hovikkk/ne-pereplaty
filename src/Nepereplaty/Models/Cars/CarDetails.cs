using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.Cars
{
    public class CarDetailsOption
    {
        public string Price;
        public string Power;
    }
        public class CarDetails
    {
        public string EngineCapacity { get; set; }
        public string EnginePower { get; set; }
        public string EnginePowerKWt { get; set; }
        public string EngineType { get; set; }
        public object EngineTypeCode { get; set; }
        public string GroupId { get; set; }
        public int Id { get; set; }
        public string Model { get; set; }
        public string Modification { get; set; }
        public string Price { get; set; }
        public string RsaCode { get; set; }
    }
}
