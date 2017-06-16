using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.OSAGOCalcService
{
    public class OSAGOOffer
    {
        public InsuracneCompany Company { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string AntiTheftSystem { get; set; }
        public AdditionalOption[] AdditionalOptions { get; set; }
        public string Description { get; set; }
        public bool IsShown { get; set; }
    }

    public class AdditionalOption
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
