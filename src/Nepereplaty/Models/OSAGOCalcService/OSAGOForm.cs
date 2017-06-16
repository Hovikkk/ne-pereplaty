using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.OSAGOCalcService
{
    public class OSAGOForm
    {
        public DateTime periodStart { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public string carBody { get; set; }
        public int power { get; set; }
        public string region { get; set; }
        public int year { get; set; }
        public DateTime startUsingDate { get; set; }
        public string carCost { get; set; }

        public bool isIndividual { get; set; }

        public bool isGuarantee { get; set; }
        public bool isOwner { get; set; }
        public Driver[] drivers { get; set; }
        public bool isAgreed { get; set; }
    }

    public class Driver
    {
        public int age { get; set; }
        public int experience { get; set; }
        public bool isMale { get; set; }
        public string martialStatus { get; set; }
        public string kids { get; set; }
    }
}
