using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.HOUSECalcService
{
    public class HOUSEForm
    {
        public string region { get; set; }
        public int year { get; set; }
        public string rent { get; set; }
        public string cover { get; set; }
        public DateTime startData { get; set; }
        public string AdditionalStructures { get; set; }
        public AdditionalStructure[] additionalStructure { get; set; }
    }

    public class AdditionalStructure
    {
        public string type { get; set; }
        public int cost { get; set; }
    }
}
