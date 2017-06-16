using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase
{
    public class Modification
    {
        [Column(Order = 1)]
        [ForeignKey("Body")]
        public int YearId { get; set; }
        [Column(Order = 2)]
        [ForeignKey("Body")]
        public string BrandName { get; set; }
        [Column(Order = 3)]
        [ForeignKey("Body")]
        public string ModelName { get; set; }
        [Column(Order = 4)]
        [ForeignKey("Body")]
        public string BodyName { get; set; }
        [Column(Order = 5)]
        public string ModificationName { get; set; }
        public string Id { get; set; }
        public string Code { get; set; }

        public virtual CarBody Body { get; set; }
        public virtual ICollection<Transmission> Transmissions { get; set; }
    }
}
