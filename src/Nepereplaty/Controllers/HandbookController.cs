using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Runtime;
using System.IO;
using Newtonsoft.Json;
using Nepereplaty.Models.Cars;
using System.Net;
using Nepereplaty.Services;
using Nepereplaty.Models.TRAVELINGCaclService;
using System.Text;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Nepereplaty.Controllers
{
    [Route("api/handbook")]
    public class HandbookController : Controller
    {
        private IApplicationEnvironment _appEnv;
        private readonly DataSources.SQLDatabase.ApplicationDbContext _applicationDbContext;
        private City[] city;
        private string cityJson;
        private Region[] region;
        private string regionJson;

        private Countrys[] country;
        private string countryJson;

        private GrabCityIngos cityGrab = new GrabCityIngos();

        public HandbookController(IApplicationEnvironment appEnv, DataSources.SQLDatabase.ApplicationDbContext applicationDbContext)
        {
            this._appEnv = appEnv;
            this._applicationDbContext = applicationDbContext;

            this.regionJson = appEnv.ApplicationBasePath + @"\App_Data\region.json";
            using (StreamReader r = new StreamReader(new FileStream(regionJson, FileMode.Open)))
            {
                string json = r.ReadToEnd();
                r.Close();
                this.region = JsonConvert.DeserializeObject<Region[]>(json);

            }
            this.countryJson = appEnv.ApplicationBasePath + @"\App_Data\Country.json";
            using (StreamReader r = new StreamReader(new FileStream(countryJson, FileMode.Open)))
            {
                string json = r.ReadToEnd();
                r.Close();
                this.country = JsonConvert.DeserializeObject<Countrys[]>(json);

            }

            this.cityJson = appEnv.ApplicationBasePath + @"\App_Data\city.json";
            using (StreamReader r = new StreamReader(new FileStream(cityJson, FileMode.Open)))
            {
                string json = r.ReadToEnd();
                r.Close();
                this.city = JsonConvert.DeserializeObject<City[]>(json);

            }
        }

        [HttpGet("city/{query}")]
        public City[] getCity(string query)
        {
            City[] result = this.cityGrab.getCity(query);


            //      result = (from city in this.city where city.name.ToLower().StartsWith(query.ToLower()) select city).Take(10).ToArray();

            //        result = (from city in this.city where city.name.ToLower().IndexOf(query.ToLower()) >= 0 select city).Take(10).ToArray();

            return result;
        }

        [HttpGet("country/")]
        public Countrys[] getCountry()
        {
            return this.country;
        }
        [HttpGet("countrymobile/{query}")]
        public Countrys[] getCountryMobile(string query)
        {

            Countrys []  result= (from count in this.country where count.name.ToLower().StartsWith(query.ToLower())
                                  select count).ToArray();

            return result;
        }

        [HttpGet("region/")]
        public RegionOption[] getRegion()
        {
            RegionOption[] result;
            result = (from reg in this.region
                      select new RegionOption
                      {
                          title = reg.title,
                          value = reg.title
                      }).ToArray();



            return result;
        }

        [HttpGet("carBrands/{year}/{query}")]
        public IEnumerable<BrandOption> CarBrands(int year, string query)
        {
            IEnumerable<BrandOption> res;

            //var release = (from releaseYear in this.years where releaseYear.Year == year select releaseYear).First();
            // res = (from brand in release.Brands where brand.Name.StartsWith(query) select brand).ToArray();
            res = (from brand in _applicationDbContext.Brands
                   where brand.YearId == year &&
                         brand.BrandName.ToLower().StartsWith(query.ToLower()) &&
                         brand.ingoId != null
                   select brand)
                   .Take(10)
                   .ToArray()
                   .Select(brand => new BrandOption
                   {
                       title = brand.BrandName,
                       value = brand.BrandName + "_" + brand.ingoId
                   })
                   .ToArray();

            return res;
        }

        [HttpGet("carModels/{year}/{brand}/{query?}")]
        public IEnumerable<CarModelOption> CarModels(int year, string brand, string query)
        {
            IEnumerable<CarModelOption> res = new List<CarModelOption>();
            //var release = (from releaseYear in this.years where releaseYear.Year == year select releaseYear).First();

            //var brands = (from _brand in release.Brands where _brand.Name == brand select _brand).First();

            if (String.IsNullOrWhiteSpace(query))
            {
                res = (from model in _applicationDbContext.Models
                       where model.YearId == year &&
                             model.BrandName == brand &&
                             model.ingoId != null
                       select model)
                       .ToArray()
                       .Select(model => new CarModelOption
                       {
                           title = model.ModelName,
                           value = model.ModelName + "_" + model.ingoId + "_" + model.Id
                       })
                       .ToArray();
            }
            else
            {
                res = (from model in _applicationDbContext.Models
                       where model.YearId == year &&
                             model.BrandName == brand &&
                             model.ModelName.ToLower().StartsWith(query.ToLower())
                       select model)
                       .ToArray()
                       .Select(model => new CarModelOption
                       {
                           title = model.ModelName,
                           value = model.ModelName
                       })
                       .ToArray();
            }
            return res;
        }

        [HttpGet("carBodies/{year}/{brand}/{model}")]
        public IEnumerable<CarBodyOption> CarBodies(int year, string brand, string model)
        {
            IEnumerable<CarBodyOption> res;
            //var release = (from releaseYear in this.years where releaseYear.Year == year select releaseYear).First();

            //var brands = (from _brand in release.Brands where _brand.Name == brand select _brand).First();
            //var models = (from _model in brands.Models where _model.Name == model select _model).First();

            res = (from _body in _applicationDbContext.CarBodies
                   where _body.YearId == year &&
                         _body.BrandName == brand &&
                         _body.ModelName == model
                   select _body)
                   .ToArray()
                   .Select(_body => new CarBodyOption
                   {
                       text = _body.BodyName,
                       value = _body.BodyName
                   })
                   .ToArray();
            return res;
        }

        [HttpGet("carModifications/{year}/{brand}/{model}/{body}")]
        public IEnumerable<ModificationOption> CarModifications(int year, string brand, string model, string body)
        {
            IEnumerable<ModificationOption> res;
            //var release = (from releaseYear in this.years where releaseYear.Year == year select releaseYear).First();

            //var brands = (from _brand in release.Brands where _brand.Name == brand select _brand).First();
            //var models = (from _model in brands.Models where _model.Name == model select _model).First();
            //var bodys = (from _body in models.Bodies where _body.Name == body select _body).First();
            res = (from _mod in _applicationDbContext.Modifications
                   where _mod.YearId == year &&
                         _mod.BrandName == brand &&
                         _mod.ModelName == model &&
                         _mod.BodyName == body
                   select _mod)
                   .ToArray()
                   .Select(_mod => new ModificationOption
                   {
                       text = _mod.ModificationName,
                       value = _mod.ModificationName
                   })
                   .ToArray();
            return res;
        }

        [HttpGet("carTransmission/{year}/{brand}/{model}/{body}/{modification}")]
        public IEnumerable<TransmissionOption> CarTransmission(int year, string brand, string model, string body, string modification)
        {
            IEnumerable<TransmissionOption> res;
            //var release = (from releaseYear in this.years where releaseYear.Year == year select releaseYear).First();

            //var brands = (from _brand in release.Brands where _brand.Name == brand select _brand).First();
            //var models = (from _model in brands.Models where _model.Name == model select _model).First();
            //var bodys = (from _body in models.Bodies where _body.Name == body select _body).First();
            //var modifications = (from _modifications in bodys.Modifications where _modifications.Name == modification select _modifications).First();
            res = (from trans in _applicationDbContext.Transmissions
                   where trans.YearId == year &&
                         trans.BrandName == brand &&
                         trans.ModelName == model &&
                         trans.BodyName == body &&
                         trans.ModificationName == modification
                   select trans)
                   .ToArray()
                   .Select(trans => new TransmissionOption
                   {
                       text = trans.TransmissionName,
                       value = trans.TransmissionName
                   })
                   .ToArray();

            return res;
        }
        [HttpGet("getcars")]
        public string getCars()
        {
            GrabCarsInIngos grab = new GrabCarsInIngos();
            return grab.getData();
        }
        [HttpGet("carDetails/{year}/{brand}/{model}/{body}/{modification}/{transmission}")]
        public CarDetails CarDetails(int year, string brand, string model, string body, string modification, string transmission)
        {
            CarDetails res = new CarDetails();
            //var release = (from releaseYear in this.years where releaseYear.Year == year select releaseYear).First();
            //var brands = (from _brand in release.Brands where _brand.Name == brand select _brand).First();
            //var models = (from _model in brands.Models where _model.Name == model select _model).First();
            //var bodys = (from _body in models.Bodies where _body.Name == body select _body).First();
            //var modifications = (from _modifications in bodys.Modifications where _modifications.Name == modification select _modifications).First();
            //var transmissions = (from _trans in modifications.Transmissions where _trans.Name == transmission select _trans).First();
            res = (from details in _applicationDbContext.Details
                   where details.YearId == year &&
                         details.BrandName == brand &&
                         details.ModelName == model &&
                         details.BodyName == body &&
                         details.ModificationName == modification &&
                         details.TransmissionName == transmission
                   select details)
                   .ToArray()
                   .Select(details => new CarDetails
                   {
                       EngineCapacity = details.EngineCapacity,
                       EnginePower = details.EnginePower,
                       EnginePowerKWt = details.EnginePowerKWt,
                       EngineType = details.EngineType,
                       EngineTypeCode = details.EngineTypeCode,
                       GroupId = details.GroupId,
                       Id = details.Id,
                       Model = details.Model,
                       Modification = details.Modification,
                       Price = details.Price,
                       RsaCode = details.RsaCode
                   }).First();
            //res = transmissions.Details;
            return res;
        }
    }
}
