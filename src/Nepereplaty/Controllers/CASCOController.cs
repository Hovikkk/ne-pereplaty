using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Net;
using System.Collections.Specialized;
using Newtonsoft.Json;
using HtmlAgilityPack;
using System.Text;
using System.IO;
using System.Globalization;
using Nepereplaty.Models.CASCOCalcService;

namespace Nepereplaty.Controllers
{
    [Route("api/casco")]
    public class CASCOController : Controller
    {
        private readonly ICASCOCalcService _CASCOCalcService;

        public CASCOController(ICASCOCalcService CASCOCalcService)
        {
            _CASCOCalcService = CASCOCalcService;
        }

        [HttpPost("insuranceoffer")]
        [AllowAnonymous]
        public async Task<CASCOOffers> GetOffers([FromBody]CASCOForm model)
        {
            return _CASCOCalcService.GetOffers(model);
        }

        
    } 
}
