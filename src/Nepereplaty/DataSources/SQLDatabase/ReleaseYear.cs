using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity.Metadata;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Nepereplaty.DataSources.SQLDatabase
{
    public class ReleaseYear
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Year { get; set; }

        public virtual ICollection<Brand> Brands { get; set; }
    }
}
