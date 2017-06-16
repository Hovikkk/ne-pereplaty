using Nepereplaty.Models.TRAVELINGCaclService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Nepereplaty.Services.TRAVELING
{
    public class TRAVELINGCalcService : ITRAVELINGCalcService
    {
        public IEnumerable<ITRAVELINGCalc> Calcs { get; set; }

        public TRAVELINGCalcService()
        {
            var calcs = new ITRAVELINGCalc[1];
            calcs[0] = new TinkkofTRAVELING();
            //calcs[1] = new RGSTRAVELINGCalc();
            Calcs = calcs;
        }

        public TRAVELINGOffers GetOffers(TRAVELINGForm model)
        {
            TRAVELINGOffers result = new TRAVELINGOffers();
            result.startData = model.periodStart.ToString("dd'.'MM'.'yyyy");
            result.endData = (model.choiceInsurance == 2)? model.periodStart.ToString("dd'.'MM'.'yyyy").Replace(model.periodStart.Year.ToString(), (model.periodStart.Year+1).ToString()) : model.periodFinish.ToString("dd'.'MM'.'yyyy");
            result.insuredsCount = model.insureds.Length.ToString();
            result.InsuranceType = model.choiceInsurance;
            result.travelingDur =(model.choiceInsurance == 2) ? model.duration.ToString() :((model.periodFinish - model.periodStart).TotalDays+1).ToString();
            model.duration = (model.choiceInsurance != 2) ? 30 : model.duration;
            for (int i = 0;i<model.countries.Length; ++i)
            {
                if (i > 0)
                {
                    result.country += ", ";
                }
                result.country += model.countries[i].name;
            }

            List<Insured> ins = new List<Insured>();
            DateTime now = DateTime.Today;
            for (int i = 0; i < model.insureds.Length; ++i)
            {
                ins.Add(new Insured(model.insureds[i].ToString("yyyy'-'MM'-'dd")));

                if (i > 0)
                {
                    result.insuredsAges += ", ";
                }

                result.insuredsAges += ((int)(((now - model.insureds[i]).TotalDays)/ 365.242)).ToString();
            }

            result.insureds = ins.ToArray();

            result.Offers = Calcs.Select(k => k.GetOffer(model)).ToArray();
            return result;
        }
    }
}
