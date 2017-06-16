using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNet.Authentication;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Data.Entity;
using Nepereplaty;
using Nepereplaty.Models;
using Nepereplaty.Services;
using Nepereplaty.Models.AccountManager;
using Nepereplaty.DataSources.SQLDatabase;
using Nepereplaty.DataSources.SQLDatabase.OfferModel;
using Nepereplaty.DataSources.SQLDatabase.CompanyModel;
using Microsoft.Data.Entity.ChangeTracking;
using Newtonsoft.Json;
using System.Net.Mail;
using System.IO;

namespace Nepereplaty.Controllers
{
    [Authorize]
    [Route("api/admin")]
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public class LoginResult
        {
            public bool isLogin { get; set; }
            public string msg { get; set; }
        }
        public class OffersResult
        {
            public long offerId { get; set; }
            public string buyer { get; set; }
            public string buyerId { get; set;}
            public string companyName { get; set; }
            public int companyId { get; set; }
            public string type { get; set; }
            public string startDat { get; set; }
            public float cost { get; set; }
            public DateTime closeDate { get; set; }
        }


        public class OfferInfo
        {
            public long offerId { get; set; }
            public string type { get; set; }
            public long dataId { get; set; }
            public float cost { get; set; }
            public string companyName { get; set; }
            public long companyId { get; set; }
            public string startDate { get; set; }

            public string endDate { get; set; }

            public string buyer { get; set; }
            public string buyerId { get; set; }

            public string comments { get; set; }
        }


        public class ResultModel
        {
            public long offerId { get; set; }
        }
        public class TravelingOfferModel
        {
            public Offer basic{ get; set; }
            public TravelingOffer traveling { get; set; }
            public Insured[] insured { get; set; }
        }



        public class ApartmentOfferModel
        {
            public Offer basic { get; set; }
            public HouseOffer home { get; set; }
        }
        public class AccidentOfferModel
        {
            public Offer basic { get; set; }
            public AccidentOffer accident { get; set; }
            public Insured insured { get; set; }
        }

        public class OsagoOfferModel
        {
           public Offer basic { get; set; }
           public OsagoOffer osago { get; set;}
           public  Driver[] drivers { get; set; }
        }

        public AdminController(UserManager<ApplicationUser> userManager, ApplicationDbContext _apc)
        {
            this._applicationDbContext = _apc;
            _userManager = userManager;
        }

        [FromServices]
        public IAccountManager AccountManager { get; set; }

       
        /// <summary>
        /// Action for get  offers.
        /// </summary>
        /// <remarks>Returns offers list.</remarks>
        /// <response code="200">everything is OK</response>

        

        [HttpPut("accident")]
        public ResultModel accidentPut([FromBody]AccidentOfferModel model)
        {
            ResultModel result = new ResultModel();
            EntityEntry<Insured> d = _applicationDbContext.insured.Add(model.insured);
            _applicationDbContext.SaveChanges();
            model.accident.insured = d.Entity.id.ToString();
            EntityEntry<AccidentOffer>  r = _applicationDbContext.accident.Add(model.accident);
            _applicationDbContext.SaveChanges();
            model.basic.dataId = r.Entity.offerId;
            EntityEntry<Offer> o = _applicationDbContext.offers.Add(model.basic);

            _applicationDbContext.SaveChanges();
            result.offerId = o.Entity.offerId;
            return result;

        }

        [HttpPut("traveling")]
        public ResultModel travelingPut([FromBody]TravelingOfferModel model)
        {
            ResultModel result = new ResultModel();

            int[] ids =new int[model.insured.Length]; ;
            for (int i=0; i<model.insured.Length;++i)
            {
                EntityEntry<Insured> d =  _applicationDbContext.insured.Add(model.insured[i]);
                _applicationDbContext.SaveChanges();
                ids[i] = d.Entity.id;
            }


            model.traveling.insureds = string.Join(",", ids);
            EntityEntry<TravelingOffer> r = _applicationDbContext.traveling.Add(model.traveling);
            _applicationDbContext.SaveChanges();
            model.basic.dataId = r.Entity.offerID;
            EntityEntry<Offer> o = _applicationDbContext.offers.Add(model.basic);

            _applicationDbContext.SaveChanges();
            result.offerId = o.Entity.offerId;
            return result;

        }

        [HttpPut("home")]
        public ResultModel homePut([FromBody]ApartmentOfferModel model)
        {
            ResultModel result = new ResultModel();

            
      
            EntityEntry<HouseOffer> r = _applicationDbContext.house.Add(model.home);
            _applicationDbContext.SaveChanges();
            model.basic.dataId = r.Entity.offerID;
            EntityEntry<Offer> o = _applicationDbContext.offers.Add(model.basic);

            _applicationDbContext.SaveChanges();
            result.offerId = o.Entity.offerId;
            return result;

        }

        [HttpPut("osago")]
        public ResultModel osagoPut([FromBody]OsagoOfferModel model)
        {
            ResultModel result = new ResultModel();

            int[] ids = new int[model.drivers.Length]; ;
            for (int i = 0; i < model.drivers.Length; ++i)
            {
                EntityEntry<Driver> d = _applicationDbContext.driver.Add(model.drivers[i]);
                _applicationDbContext.SaveChanges();
                ids[i] = d.Entity.id;
            }


            model.osago.drivers = string.Join(",", ids);
            EntityEntry<OsagoOffer> r = _applicationDbContext.osago.Add(model.osago);
            _applicationDbContext.SaveChanges();
            model.basic.dataId = r.Entity.offerId;
            EntityEntry<Offer> o = _applicationDbContext.offers.Add(model.basic);

            _applicationDbContext.SaveChanges();
            result.offerId = o.Entity.offerId;
            return result;

        }

        [HttpPut("casco")]
        public ResultModel cascoPut([FromBody]OsagoOfferModel model)
        {
            ResultModel result = new ResultModel();

            int[] ids = new int[model.drivers.Length]; ;
            for (int i = 0; i < model.drivers.Length; ++i)
            {
                EntityEntry<Driver> d = _applicationDbContext.driver.Add(model.drivers[i]);
                _applicationDbContext.SaveChanges();
                ids[i] = d.Entity.id;
            }


            model.osago.drivers = string.Join(",", ids);
            EntityEntry<CascoOffer> r = _applicationDbContext.casco.Add(new CascoOffer()
            {
                brand = model.osago.brand,
                carBody = model.osago.carBody,
                drivers = model.osago.drivers,
                model = model.osago.model,
                offerId = model.osago.offerId
            });
            _applicationDbContext.SaveChanges();
            model.basic.dataId = r.Entity.offerId;
            EntityEntry<Offer> o = _applicationDbContext.offers.Add(model.basic);

            _applicationDbContext.SaveChanges();
            result.offerId = o.Entity.offerId;
            return result;

        }

        
        [HttpGet("purchas/{id}/{cost}")]
        public ResultModel Purchas(int id, float cost)
        {
            ResultModel result = new ResultModel();
            result.offerId = id;

            Offer offer = (from off in _applicationDbContext.offers.ToArray() where off.offerId == id select off).First();

            offer.purchas = true;
            offer.cost = cost;

            string[] arr = offer.endDate.Split('.');

            int year = int.Parse(arr[2]);
            int mounth = int.Parse(arr[1]);
            int day = int.Parse(arr[0]);

            offer.closeData = new DateTime(year,mounth,day);
            _applicationDbContext.offers.Update(offer);
            _applicationDbContext.SaveChanges();
            sendMail(offer.buyer, offer.cost);

                

            return result;
        }

        private void sendMail(string email,float cost)
        {
            SmtpClient client = new SmtpClient();

            MemoryStream memoryStream = new MemoryStream();

            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.EnableSsl = true;
            client.Host = "smtp.gmail.com";
            client.Port = 587;

            // setup Smtp authentication
            System.Net.NetworkCredential credentials =
            new System.Net.NetworkCredential("nepereplay@gmail.com", "nepereplaty123");
            client.UseDefaultCredentials = true;
            client.Credentials = credentials;

            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("nepereplaty@gmail.com");
            msg.To.Add(new MailAddress(email));


            msg.Subject = "Уведомление";
            msg.IsBodyHtml = true;
            msg.Body = string.Format("<html><head></head><body><b>Вы купили полис на сумму " + cost.ToString() + " руб.</b></body>");
            msg.Attachments.Add(new Attachment(memoryStream, "../frontend/p/example.pdf"));

            try
            {
                client.Send(msg);
            }
            catch (Exception ex)
            {
            }
        }

        [HttpGet("offerInfo/{id}")]
        public async Task<OfferInfo> GetOfferInfo(long id)
        {
            Offer of = _applicationDbContext.offers.Single(off => off.offerId == id);

            OfferInfo result = new OfferInfo
            {
                offerId = of.offerId,
                buyer = of.buyer,
                buyerId = of.buyer,
                comments = of.comments,
                companyId = of.companyId,
                
                cost = of.cost,
                dataId = of.dataId,
                endDate = of.endDate,
                startDate = of.startDate,
                type = of.type
            };

            result.companyName = _applicationDbContext.company.Single(com => com.id == result.companyId).name;
            result.buyer = await this.getFullName(result.buyerId);

            return result;

        }

        [HttpGet("company/{id}")]
        public Company GetCompany(int id)
        {
            Company result = _applicationDbContext.company.Single(com => com.id == id);

            return result;
        }
        [HttpPut("updatecompany")]
        public Company UpdateCompany([FromBody]Company model)
        {

            Company company = (from com in _applicationDbContext.company.ToArray() where com.id == model.id select com).First();

            company.comments = model.comments;
            company.address = model.address;
            company.contactName = model.contactName;
            company.email = model.email;
            company.insurances = model.insurances;
            company.name = model.name;
            company.telephone = model.telephone;
            _applicationDbContext.company.Update(company);
            _applicationDbContext.SaveChanges();
            

            return company;
        }
        [HttpGet("gethomeoffer/{id}")]
        public ApartmentOfferModel GetHomeOffer(int id)
        {
            ApartmentOfferModel result = new ApartmentOfferModel();

            result.home = (from ha in _applicationDbContext.house.ToArray() where ha.offerID == id select ha).First();

            return result;

        }

        [HttpGet("getcascoffer/{id}")]
        public OsagoOfferModel GetCascoOffer(int id)
        {
            OsagoOfferModel result = new OsagoOfferModel();

            result.osago = (from ha in _applicationDbContext.casco.ToArray() where ha.offerId == id select new OsagoOffer()
            {
                brand = ha.brand,
                carBody = ha.carBody,
                drivers = ha.drivers,
                model = ha.model,
                offerId = ha.offerId
            }).First();

            string[] drivers = result.osago.drivers.Split(',');

            result.drivers = (from ins in _applicationDbContext.driver.ToArray() where Array.IndexOf(drivers, ins.id.ToString()) != -1 select ins).ToArray();

            return result;

        }
        [HttpGet("getosagoffer/{id}")]
        public OsagoOfferModel GetOsagoOffer(int id)
        {
            OsagoOfferModel result = new OsagoOfferModel();

            result.osago = (from ha in _applicationDbContext.osago.ToArray()
                            where ha.offerId == id select ha).First();

            string[] drivers = result.osago.drivers.Split(',');

            result.drivers = (from ins in _applicationDbContext.driver.ToArray() where Array.IndexOf(drivers, ins.id.ToString()) != -1 select ins).ToArray();

            return result;

        }
        [HttpGet("getaccidentoffer/{id}")]
        public AccidentOfferModel GetAccidentOffer(int id)
        {
            AccidentOfferModel result = new AccidentOfferModel();


            result.accident = (from ac in _applicationDbContext.accident.ToArray() where ac.offerId == id select ac).First();




            int insId = int.Parse(result.accident.insured);
           

            result.insured = (from ins in _applicationDbContext.insured.ToArray() where ins.id == insId  select ins).First();

            return result;

        }
        
        [HttpGet("gettravelingoffer/{id}")]
        public TravelingOfferModel GetTravelingOffer(int id)
        {
            TravelingOfferModel result = new TravelingOfferModel();


            result.traveling = (from tr in _applicationDbContext.traveling.ToArray() where tr.offerID == id select tr).First();

            string[] insureds = result.traveling.insureds.Split(',');

            result.insured = (from ins in _applicationDbContext.insured.ToArray() where Array.IndexOf(insureds, ins.id.ToString()) != -1 select ins).ToArray();

            return result;

        }

        [HttpPut("editprofile")]
        public async Task<ProfileResult> EditProfile([FromBody]ProfileModel model)
        {
            ProfileResult result = new ProfileResult();
            var user = await _userManager.FindByEmailAsync(model.Email);

            user.isAdmin = model.isAdmin;
            user.comments = model.comments;

            var identityResult = await _userManager.UpdateAsync(user);
            result.IsSuccessful = identityResult.Succeeded;
            if (!result.IsSuccessful)
            {
                result.Error = CreateProfileError.Unknown;
            }

            return result;
        }


        [HttpGet("getprofile/{email}")]
        public async Task<ProfileModel> GetProfile(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return new ProfileModel()
            {
                Adress = user.Adress,
                Birthday = user.Birthday,
                City = user.City,
                Email = user.Email,
                IsMale = user.IsMale,
                Mobile = user.Mobile,
                Name = user.Name,
                Passport = user.Passport,
                Surname = user.Surname,
                Telephone = user.Telephone,
                Middlename = user.Middlename,
                TelephoneCode = user.TelephoneCode,
                MobileCode = user.MobileCode,
                PassportnNumber = user.PassportnNumber,
                PassportSerial = user.PassportSerial,
                PassportWhen = user.PassportWhen,
                PassportWhere = user.PassportWhere,
                PassportIssued = user.PassportIssued,
                comments = user.comments,
                isAdmin = user.isAdmin


            };
        }


        [HttpPut("updateoffer")]
        public async Task<OfferInfo[]> updateOfferComment([FromBody]OfferInfo model)
        {

            Offer[] offers = _applicationDbContext.offers.ToArray();
            Offer offer= (from reg in offers where reg.offerId == model.offerId select reg).First();

            offer.comments = model.comments;
            _applicationDbContext.offers.Update(offer);
            _applicationDbContext.SaveChanges();

            OfferInfo[] result;
            Company[] company = _applicationDbContext.company.ToArray();

            result = (from reg in offers
                      join com in company on reg.companyId equals com.id
                      where reg.buyer == model.buyerId
                      select new OfferInfo
                      {
                          offerId = reg.offerId,
                          buyer = reg.buyer,
                          buyerId = reg.buyer,
                          companyName = com.name,
                          companyId = com.id,
                          cost = reg.cost,
                          startDate = reg.startDate,
                          type = reg.type,
                          comments = reg.comments,
                          dataId = reg.dataId,
                          endDate = reg.endDate
                      }).ToArray();

            foreach (OfferInfo or in result)
            {
                or.buyer = await this.getFullName(or.buyerId);

            }
            return result;
        }

        [HttpGet("useroffers/{user}")]
        public async Task<OfferInfo[]> getuserOffers(string user)
        {
            OfferInfo[] result;

            Offer[] offers = _applicationDbContext.offers.ToArray();
            Company[] company = _applicationDbContext.company.ToArray();

            result = (from reg in offers
                      join com in company on reg.companyId equals com.id where reg.buyer == user
                      select new OfferInfo
                      {
                          offerId = reg.offerId,
                          buyer = reg.buyer,
                          buyerId = reg.buyer,
                          companyName = com.name,
                          companyId = com.id,
                          cost = reg.cost,
                          startDate = reg.startDate,
                          type = reg.type,
                          comments = reg.comments,
                          dataId = reg.dataId,
                          endDate = reg.endDate
                      }).ToArray();

            foreach (OfferInfo or in result)
            {
                or.buyer = await this.getFullName(or.buyerId);

            }

            return result; 
        }

        [HttpGet("offers")]
        public async Task<OffersResult[]> getOffers()
        {
            OffersResult[] result;

            Offer[] offers = _applicationDbContext.offers.ToArray();
            Company[] company = _applicationDbContext.company.ToArray();

            result = (from reg in offers
                      join com in company on reg.companyId equals com.id where reg.purchas
                      select new OffersResult
                      {
                          offerId = reg.offerId,
                          buyer = reg.buyer,
                          buyerId = reg.buyer,
                          companyName = com.name,
                          companyId = com.id,
                          cost = reg.cost,
                          startDat = reg.startDate,
                          type = reg.type
                      }).ToArray();

            foreach (OffersResult or in result)
            {
                or.buyer =  await this.getFullName(or.buyerId);
               
            }

            return result;

        }

        [HttpGet("closedataoffers")]
        public async Task<OffersResult[]> getCloseDateOffers()
        {
            OffersResult[] result;


            Offer[] offers = _applicationDbContext.offers.ToArray();
            Company[] company = _applicationDbContext.company.ToArray();

            DateTime compareDate = DateTime.Now;
            compareDate = compareDate.AddMonths(1);


            //&& off.closeData.HasValue &&  DateTime.Compare(off.closeData.Value, compareDate) <= 0 && DateTime.Compare(off.closeData.Value, DateTime.Now) > 0
            result = (from off in offers
                      join com in company on off.companyId equals com.id where off.purchas && off.closeData.HasValue && DateTime.Compare(off.closeData.Value, compareDate) <= 0 && DateTime.Compare(off.closeData.Value, DateTime.Now) > 0
                      select new OffersResult
                      {
                          offerId = off.offerId,
                          buyer = off.buyer,
                          buyerId = off.buyer,
                          companyName = com.name,
                          companyId = com.id,
                          cost = off.cost,
                          startDat = off.startDate,
                          type = off.type,
                          closeDate = off.closeData.Value
                          
                      }).ToArray();

            foreach (OffersResult or in result)
            {

                int last = DateTime.Compare(or.closeDate, compareDate);
                int next = DateTime.Compare(or.closeDate, DateTime.Now);
                or.buyer = await this.getFullName(or.buyerId);

            }

            return result;

        }
        [HttpGet("onpurchasoffers")]
        public async Task<OffersResult[]> getOnPurchasOffers()
        {
            OffersResult[] result;


            Offer[] offers = _applicationDbContext.offers.ToArray();
            Company[] company = _applicationDbContext.company.ToArray();

            DateTime compareDate = DateTime.Now;
            compareDate.AddMonths(1);


            result = (from reg in offers
                      join com in company on reg.companyId equals com.id
                      where !reg.purchas
                      select new OffersResult
                      {
                          offerId = reg.offerId,
                          buyer = reg.buyer,
                          buyerId = reg.buyer,
                          companyName = com.name,
                          companyId = com.id,
                          cost = reg.cost,
                          startDat = reg.startDate,
                          type = reg.type
                      }).ToArray();

            foreach (OffersResult or in result)
            {
                or.buyer = await this.getFullName(or.buyerId);

            }

            return result;

        }
        public async Task<string> getFullName(string email)
        {
            string result;
            var user = await _userManager.FindByEmailAsync(email);
            result = user.Name + " " + user.Surname;
            return result;
        }

  //      [HttpGet("login")]

  //      public Login([FromBody] OfferInfo model)


    }
}
