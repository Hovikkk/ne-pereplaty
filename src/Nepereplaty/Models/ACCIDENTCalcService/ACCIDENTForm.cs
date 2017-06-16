using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.ACCIDENTCalcService
{
    public class ACCIDENTForm
    {
        public DateTime startData { get; set; }
        public int duration { get; set; }
        public bool otherPerson { get; set; }
        public double age { get; set; }
        public bool amateurSports { get; set; }
    }
}
