using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.OSAGOCalcService;

namespace Nepereplaty.Services.OSAGO
{
    public class OSAGOCalcService : IOSAGOCalcService
    {
        public IEnumerable<IOSAGOCalc> Calcs { get; set; }

        public OSAGOCalcService()
        {
            var calcs = new IOSAGOCalc[2];
            calcs[0] = new IngosOSAGOCalc();
            calcs[1] = new TinkoffOSAGOCalc();
           // calcs[1] = new IngosOSAGOCalc();
            Calcs = calcs;
        }

        public OSAGOOffers GetOffers(OSAGOForm model)
        {
            OSAGOOffers result = new OSAGOOffers();
            result.CarBrand = model.brand;
            result.CarModel = model.model;
            result.CarReleaseYear = model.year;
            result.DriversCount = model.drivers.Length;
            result.DriversMinAge = model.drivers.Min(d => d.age);
            result.startData = model.periodStart.ToString("dd.MM.yyyy");
            result.endData = model.periodStart.AddYears(1).ToString("dd.MM.yyyy");
            result.Offers = Calcs.Select(k => k.GetOffer(model)).ToArray();

            return result;
        }
    }
}
