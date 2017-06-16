using Microsoft.AspNet.Mvc;
using Nepereplaty.Models.TRAVELINGCaclService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Controllers
{
    [Route("api/traveling")]
    public class TRAVELINGController : Controller
    {
        private readonly ITRAVELINGCalcService _TRAVELINGCalcService;

        public TRAVELINGController(ITRAVELINGCalcService HOUSECalcService)
        {
            _TRAVELINGCalcService = HOUSECalcService;
        }

        [HttpPost("insuranceoffer")]
        [AllowAnonymous]
        public async Task<TRAVELINGOffers> GetOffers([FromBody]TRAVELINGForm model)
        {
            TRAVELINGForm m = model;
            return _TRAVELINGCalcService.GetOffers(model);
        }

        [HttpGet("check")]
        [AllowAnonymous]
        public async Task<TRAVELINGOffers> Check([FromBody]TRAVELINGForm model)
        {
            TRAVELINGForm m = new TRAVELINGForm();
            return _TRAVELINGCalcService.GetOffers(m);
        }
    }
}
