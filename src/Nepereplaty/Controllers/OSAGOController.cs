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
using Nepereplaty.Models.OSAGOCalcService;

namespace Nepereplaty.Controllers
{
    [Route("api/osago")]
    public class OSAGOController : Controller
    {
        private readonly IOSAGOCalcService _OSAGOCalcService;

        public OSAGOController(IOSAGOCalcService OSAGOCalcService)
        {
            _OSAGOCalcService = OSAGOCalcService;
        }

        [HttpPost("insuranceoffer")]
        [AllowAnonymous]
        public async Task<OSAGOOffers> GetOffers([FromBody]OSAGOForm model)
        {
            OSAGOForm d = model;
            return _OSAGOCalcService.GetOffers(model);
        }
    } 
}
