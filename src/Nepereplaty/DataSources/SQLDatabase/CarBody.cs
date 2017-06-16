using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase
{
    public class CarBody
    {
        [Column(Order = 1)]
        [ForeignKey("Model")]
        public int YearId { get; set; }
        [Column(Order = 2)]
        [ForeignKey("Model")]
        public string BrandName { get; set; }
        [Column(Order = 3)]
        [ForeignKey("Model")]
        public string ModelName { get; set; }
        [Column(Order = 4)]
        public string BodyName { get; set; }
        public string Id { get; set; }
        public string Code { get; set; }

        public virtual Model Model { get; set; }
        public virtual ICollection<Modification> Modifications { get; set; }
    }
}
