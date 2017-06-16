using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.CASCOCalcService;
using System.Diagnostics;

namespace Nepereplaty.Services.CASCO
{
    
    public class CASCOCalcService : ICASCOCalcService
    {
        public IEnumerable<ICASCOCalc> Calcs { get; set; }

        public CASCOCalcService()
        {
            var calcs = new ICASCOCalc[1];
            //calcs[0] = new IngosCASCOCalc();
            calcs[0] = new TinkoffCASCOCalc();
            Calcs = calcs;
        }

        public CASCOOffers GetOffers(CASCOForm model)
        {
           
            CASCOOffers result = new CASCOOffers();
            result.CarBrand = model.brand;
            result.CarModel = model.model;
            result.CarReleaseYear = model.releaseYear;
            result.DriversCount = model.drivers.Length;
            result.DriversMinAge = model.drivers.Min(d => d.age);
            result.startData = model.periodStart.ToString("dd.MM.yyyy");
            result.endData = model.periodStart.AddYears(1).ToString("dd.MM.yyyy");
            result.Offers = Calcs.Select(k => k.GetOffer(model)).ToArray();

            return result;
        }
    }
}
