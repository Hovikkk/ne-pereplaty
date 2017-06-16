using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase
{    
    public class Model
    {
        [Column(Order = 1)]
        [ForeignKey("Brand")]
        public int YearId { get; set; }
        [Column(Order = 2)]
        [ForeignKey("Brand")]
        public string BrandName { get; set; }
        [Column(Order = 3)]
        public string ModelName { get; set; }
        public int Id { get; set; }
        public string Code { get; set; }
        public string ingoId { get; set; }

        public virtual Brand Brand { get; set; }
        public virtual ICollection<CarBody> Bodies { get; set; }
    }
}