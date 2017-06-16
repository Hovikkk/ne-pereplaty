using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.TRAVELINGCaclService
{
    public class TRAVELINGForm
    {
        public Countrys[] countries { get; set; }
        public DateTime periodStart { get; set; }
        public DateTime periodFinish { get; set; }
        public DateTime[] insureds { get; set; }
        public object leisureOrSports { get; set; }
        public object chronic { get; set; }
        public object pregnant { get; set; }
        public double choiceInsurance { get; set; }
        public object currencyAndSum { get; set; }
        public int duration { get; set; }
    }

    public class AdditionalStructure
    {
        public string type { get; set; }
        public int cost { get; set; }
    }
}
