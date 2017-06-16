using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Nepereplaty.Models.HOUSECalcService;
namespace Nepereplaty.Controllers
{
   
    [Route("api/house")]
    public class HOUSEController : Controller
    {
        private readonly IHOUSECalcService _HOUSECalcService;

        public HOUSEController(IHOUSECalcService HOUSECalcService)
        {
            _HOUSECalcService = HOUSECalcService;
        }

        [HttpPost("insuranceoffer")]
        [AllowAnonymous]
        public async Task<HOUSEOffers> GetOffers([FromBody]HOUSEForm model)
        {
            HOUSEForm m = model;
            return _HOUSECalcService.GetOffers(model);
        }


    }
}
