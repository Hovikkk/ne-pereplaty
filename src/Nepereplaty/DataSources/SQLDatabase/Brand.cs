using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase
{
    public class Brand
    {
        [Column(Order = 1)]
        [ForeignKey("Year")]
        public int YearId { get; set; }
        [Column(Order = 2)]
        public string BrandName { get; set; }
        public int Id { get; set; }
        public string Code { get; set; }
        public string ingoId { get; set; }

        public virtual ReleaseYear Year { get; set; }
        public virtual ICollection<Model> Models { get; set; }
    }
}
