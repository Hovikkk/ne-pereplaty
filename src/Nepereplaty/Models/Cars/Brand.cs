using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.Cars
{
    public class Brand
    {
        public object Code { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string ingoId { get; set; }
        public Model[] Models { get; set; }
    }

    public class BrandOption
    {
        public string title { get; set; }
        public string value { get; set; }


    }
    public class BrandIngos
    {
        public CarModelIngos[] Models;
        public string Name;
        public string Id;

    }
}
