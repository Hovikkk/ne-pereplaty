using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.CASCOCalcService
{
    public class CASCOForm
    {
        public DateTime periodStart { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public string carBody { get; set; }
        public int power { get; set; }
        public string region { get; set; }
        public int releaseYear { get; set; }
        public string releaseYearIsLarge { get; set; }
        public bool isGuarantee { get; set; }
        public DateTime startUsingDate { get; set; }
        public DateTime buyingDate { get; set; }
        public string carCost { get; set; }
        public string franchise { get; set; }
        public bool isCredit { get; set; }
        public string modification { get; set; }
        public string transmission { get; set; }

        public bool isIndividual { get; set; }
        public bool isOwner { get; set; }
        public Driver[] drivers { get; set; }

        public string wasInsurance { get; set; }
        public string wasClaims { get; set; }
        public string carClaimsOneYearAgo { get; set; }
        public string carClaimsTwoYearAgo { get; set; }
        public string carClaimsThreeYearAgo { get; set; }
        public string mutilationClaimsOneYearAgo { get; set; }
        public string mutilationClaimsTwoYearAgo { get; set; }
        public string mutilationClaimsThreeYearAgo { get; set; }

        public string city { get; set; }
        public bool isLeftSideRudder { get; set; }
        public bool isInsuranceSteal { get; set; }
        public bool isInsuranceDamage { get; set; }
        public string antiTheftSystem { get; set; }
        public string antiTheftSystem_another { get; set; }
        public string searchSystem { get; set; }
        public string searchSystem_another { get; set; }

        public string commissioner { get; set; }
        public string evacuation { get; set; }
        public string techSupport { get; set; }
        public string policeReference { get; set; }
        public string InsuranceMode { get; set; }

        public bool isAgreed { get; set; }

        public string VehicleMarkModelCode { get; set; }
        public string Model { get; set; }
        public string Modification { get; set; }
        public string EngineCapacity { get; set; }
        public string EngineHorsepower { get; set; }
        public string EnginePowerKWt { get; set; }
        public string GroupId { get; set; }
        public string EngineType { get; set; }
        public string EngineTypeCode { get; set; }
        public string VehicleMarkModelRAMICode { get; set; }
        public string Price { get; set; }
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
