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

namespace Nepereplaty.Controllers
{
    [Authorize]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private static bool _databaseChecked;

        [FromServices]
        public IAccountManager AccountManager { get; set; }

        /// <summary>
        /// Action for checking if user already authenticated.
        /// </summary>
        /// <remarks>Returns login result.</remarks>
        /// <response code="200">everything is OK</response>
        [HttpGet]
        [AllowAnonymous]
        public async Task<LoginResult> Index()
        {
            LoginResult result = await AccountManager.CheckUser();

            return result;
        }

        /// <summary>
        /// Action for editing profile.
        /// </summary>
        /// <remarks>Returns edit result.</remarks>
        /// <response code="200">everything is OK</response>
        [HttpPut]
        public async Task<ProfileResult> EditProfile([FromBody]ProfileModel model)
        {
            ProfileResult result = new ProfileResult();
            if (ModelState.IsValid)
            {
                result = await AccountManager.EditProfile(model);
            }
            else
            {
                result.IsSuccessful = false;
                result.Error = CreateProfileError.Unknown;
            }

            return result;
        }
        [HttpGet("admin")]
        public async Task<LoginResult> adminCheck()
        {
            LoginResult result = await AccountManager.CheckAdminUser();

            
            return result;
        }
        /// <summary>
        /// Action for editing profile.
        /// </summary>
        /// <remarks>Returns edit result.</remarks>
        /// <response code="200">everything is OK</response>
        [HttpPut("changepassword")]
        public async Task<ChangePasswordResult> ChangePassword([FromBody]ChangePasswordModel model)
        {
            ChangePasswordResult result = new ChangePasswordResult();
            if (ModelState.IsValid)
            {
                result = await AccountManager.ChangePassword(model);
            }
            else
            {
                result.IsSuccessful = false;
                result.Error = ChangePasswordError.Unknown;
            }

            return result;
        }

        /// <summary>
        /// Action for login.
        /// </summary>
        /// <remarks>Returns login result.</remarks>
        /// <response code="200">everything is OK</response>
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<LoginResult> Login([FromBody]LoginModel model)
        {
            LoginResult result = new LoginResult();
            if (ModelState.IsValid)
            {
                result = await AccountManager.Login(model);
            }
            else
            {
                result.IsSuccessful = false;
            }

            return result;
        }
        [HttpPost("loginadmin")]
        [AllowAnonymous]
        public async Task<LoginResult> LoginAdmin([FromBody]LoginModel model)
        {
            LoginResult result = new LoginResult();
            if (ModelState.IsValid)
            {
                result = await AccountManager.LoginAdmin(model);
            }
            else
            {
                result.IsSuccessful = false;
            }

            return result;
        }
        /// <summary>
        /// Action for logout.
        /// </summary>
        /// <remarks>Returns nothing.</remarks>
        /// <response code="200">everything is OK</response>
        [HttpPost("logout")]
        public void Logout()
        {
            AccountManager.Logout();
            this.Response.StatusCode = 200;//TODO: check why this behavior doesn't work by default
        }

        /// <summary>
        /// Action for registration.
        /// </summary>
        /// <remarks>Returns registration result.</remarks>
        /// <response code="200">everything is OK</response>
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<RegisterResult> Register([FromBody]RegisterModel model)
        {
            RegisterResult result = new RegisterResult();
            if (ModelState.IsValid)
            {
                if (model.Password != model.ConfirmPassword)
                {
                    result.IsSuccessful = false;
                    result.Error = RegisterError.ConfirmPasswordInvalid;
                }
                else
                {
                    result = await AccountManager.Register(model);
                }
            }
            else
            {
                result.IsSuccessful = false;
                result.Error = RegisterError.Unknown;
                if (ModelState.ContainsKey("Email"))
                {
                    result.Error = RegisterError.EmailInvalid;
                }
                if (ModelState.ContainsKey("Password"))
                {
                    result.Error = RegisterError.PasswordInvalid;
                }
            }

            return result;
        }

        /// <summary>
        /// Action for retrieving profile.
        /// </summary>
        /// <remarks>Returns profile.</remarks>
        /// <response code="200">everything is OK</response>
        [HttpGet("profile")]
        public async Task<ProfileModel> GetProfile()
        {
            ProfileModel result = await AccountManager.GetProfile();


            return result;
        }
    }
}
