using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.ACCIDENTCalcService;

namespace Nepereplaty.Controllers
{

    [Route("api/accident")]
    public class ACCIDENTController : Controller
    {
        private readonly IACCIDENTCalcService _ACCIDENTCalcService;

        public ACCIDENTController(IACCIDENTCalcService HOUSECalcService)
        {
            _ACCIDENTCalcService = HOUSECalcService;
        }

        [HttpPost("insuranceoffer")]
        [AllowAnonymous]
        public async Task<ACCIDENTOffers> GetOffers([FromBody]ACCIDENTForm model)
        {
            ACCIDENTForm m = model;
            return _ACCIDENTCalcService.GetOffers(model);
        }

        [HttpGet("check")]
        [AllowAnonymous]
        public async Task<ACCIDENTOffers> Check([FromBody]ACCIDENTForm model)
        {
            ACCIDENTForm m = new ACCIDENTForm();
            return _ACCIDENTCalcService.GetOffers(m);
        }
    }
}

