using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase
{
    public class Transmission
    {
        [Column(Order = 1)]
        [ForeignKey("Modification")]
        public int YearId { get; set; }
        [Column(Order = 2)]
        [ForeignKey("Modification")]
        public string BrandName { get; set; }
        [Column(Order = 3)]
        [ForeignKey("Modification")]
        public string ModelName { get; set; }
        [Column(Order = 4)]
        [ForeignKey("Modification")]
        public string BodyName { get; set; }
        [Column(Order = 5)]
        [ForeignKey("Modification")]
        public string ModificationName { get; set; }
        [Column(Order = 6)]
        public string TransmissionName { get; set; }
        public int Id { get; set; }
        public string Code { get; set; }

        public virtual Modification Modification { get; set; }
        public virtual CarDetails Details { get; set; }
    }
}
