using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase
{
    public class CarDetails
    {
        [Column(Order = 1)]
        [ForeignKey("Transmission")]
        public int YearId { get; set; }
        [Column(Order = 2)]
        [ForeignKey("Transmission")]
        public string BrandName { get; set; }
        [Column(Order = 3)]
        [ForeignKey("Transmission")]
        public string ModelName { get; set; }
        [Column(Order = 4)]
        [ForeignKey("Transmission")]
        public string BodyName { get; set; }
        [Column(Order = 5)]
        [ForeignKey("Transmission")]
        public string ModificationName { get; set; }
        [Column(Order = 6)]
        [ForeignKey("Transmission")]
        public string TransmissionName { get; set; }
        public int Id { get; set; }
        public string EngineCapacity { get; set; }
        public string EnginePower { get; set; }
        public string EnginePowerKWt { get; set; }
        public string EngineType { get; set; }
        public string EngineTypeCode { get; set; }
        public string GroupId { get; set; }
        public string Model { get; set; }
        public string Modification { get; set; }
        public string Price { get; set; }
        public string RsaCode { get; set; }

        [Required]
        public virtual Transmission Transmission { get; set; }
    }
}
