using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.Cars
{
    
    public class Model
    {
        public object Code { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string ingoId { get; set; }
        public CarBody[] Bodies { get; set; }
    }

    public class CarModelOption
    {
        public string title { get; set; }
        public string value { get; set; }
    }
    public class CarModelIngos
    {
        public string BrandID;
        public string ID;
        public string ModifISN;
        public string Title;
    }
}
