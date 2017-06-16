
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Nepereplaty.Models.APARTMENTCalcService;
namespace Nepereplaty.Controllers
{

    [Route("api/apartment")]
    public class APARTMENTController : Controller
    {
        private readonly IAPARTMENTCalcService _APARTMENTCalcService;

        public APARTMENTController(IAPARTMENTCalcService HOUSECalcService)
        {
            _APARTMENTCalcService = HOUSECalcService;
        }

        [HttpPost("insuranceoffer")]
        [AllowAnonymous]
        public async Task<APARTMENTOffers> GetOffers([FromBody]APARTMENTForm model)
        {
            APARTMENTForm m = model;
            return _APARTMENTCalcService.GetOffers(model);
        }


    }
}

