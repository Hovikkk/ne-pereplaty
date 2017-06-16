using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.APARTMENTCalcService
{
    public class APARTMENTForm
    {
        public DateTime startData { get; set; }
        public string region { get; set; }
        public int area { get; set; }
        public bool property { get; set; }
        public bool rent { get; set; }
        public long sum { get; set; }
    }
}
