using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Nepereplaty.DataSources.SQLDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nepereplaty.Models.AccountManager;
using Microsoft.AspNet.Mvc;
using System.Security.Claims;

namespace Nepereplaty.Services
{
    public class AccountManager : IAccountManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IScopedInstance<ActionContext> _actionContext;//this is needed for proper work with user, actually I hope it'll be only one place where this used
        private readonly ApplicationDbContext _dbo;

        public AccountManager(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ApplicationDbContext applicationDbContext,
            IScopedInstance<ActionContext> actionContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dbo = applicationDbContext;
            _actionContext = actionContext;//TODO: may be some work with checking Value is needed, but I'm not sure
            ApplicationDbContext.EnsureDatabaseCreated(_dbo);//TODO: This needed to be deleted when EF7 auto migrations work
        }

        public async Task<LoginResult> CheckUser()
        {
            LoginResult result = new LoginResult();
            result.Id = _actionContext.Value.HttpContext.User.GetUserId();
            result.IsSuccessful = !String.IsNullOrWhiteSpace(result.Id);
            if (result.IsSuccessful)
            {
                var user = await _userManager.FindByIdAsync(result.Id);
                //TODO: result.RegistrationStep
                result.Name = user.Name;
                result.Surname = user.Surname;
            }

            return result;
        }
        public async Task<LoginResult> CheckAdminUser()
            {
                LoginResult result = new LoginResult();
                result.Id = _actionContext.Value.HttpContext.User.GetUserId();
                result.IsSuccessful = !String.IsNullOrWhiteSpace(result.Id);
                if (result.IsSuccessful)
                {
                    var user = await _userManager.FindByIdAsync(result.Id);
                if (user.isAdmin)
                {
                    result.Id = user.Id;
                    //TODO: result.RegistrationStep
                    result.Name = user.Name;
                    result.Surname = user.Surname;
                }
                else
                {
                    result.IsSuccessful = false;
                }
            }

                return result;
            }

        public async Task<LoginResult> Login(LoginModel model)
        {
            LoginResult result = new LoginResult();
            
            var signInResult = await _signInManager.PasswordSignInAsync(model.Email, model.Password, isPersistent: true, lockoutOnFailure: false);
            if (signInResult.Succeeded)
            {
                result.IsSuccessful = true;
                var user = await _userManager.FindByEmailAsync(model.Email);//It seems to be the only way to get User on this step TODO: check for some more efficient way to do this
                result.Id = user.Id;
                //TODO: result.RegistrationStep
                result.Name = user.Name;
                result.Surname = user.Surname;
               
            }
            else
            {
                result.IsSuccessful = false;
            }

            return result;
        }
        public async Task<LoginResult> LoginAdmin(LoginModel model)
        {
            LoginResult result = new LoginResult();

            var signInResult = await _signInManager.PasswordSignInAsync(model.Email, model.Password, isPersistent: true, lockoutOnFailure: false);

            if (signInResult.Succeeded)
            {
                result.IsSuccessful = true;
                var user = await _userManager.FindByEmailAsync(model.Email);//It seems to be the only way to get User on this step TODO: check for some more efficient way to do this
                if (user.isAdmin)
                {
                    result.Id = user.Id;
                    //TODO: result.RegistrationStep
                    result.Name = user.Name;
                    result.Surname = user.Surname;
                }
                else
                {
                    result.IsSuccessful = false;
                }
               
            }
            else
            {
                result.IsSuccessful = false;
            }

            return result;
        }
        public void Logout()
        {
            _signInManager.SignOutAsync();
        }

        public async Task<RegisterResult> Register(RegisterModel model)
        {
            RegisterResult result = new RegisterResult();

            var isEmailExists = (await _userManager.FindByEmailAsync(model.Email)) != null ;
            if (!isEmailExists)
            {
                var user = new ApplicationUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    Name = model.Name,
                    Surname = model.Surname
                };
                var identityResult = await _userManager.CreateAsync(user, model.Password);
                if (identityResult.Succeeded)
                {
                    // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
                    // Send an email with this link
                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Context.Request.Scheme);
                    //await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
                    //    "Please confirm your account by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    result.IsSuccessful = true;
                }
                else
                {
                    result.IsSuccessful = false;
                    result.Error = RegisterError.Unknown;
                }
            }
            else
            {
                result.IsSuccessful = false;
                result.Error = RegisterError.EmailExists;
            }
            return result;
        }

        public async Task<ProfileModel> GetProfile()
        {
            var userId = _actionContext.Value.HttpContext.User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
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

        };
        }

        public async Task<ProfileResult> EditProfile(ProfileModel model)
        {
            ProfileResult result = new ProfileResult();
            var userId = _actionContext.Value.HttpContext.User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);

            user.Name = model.Name;
            user.Surname = model.Surname;
            user.City = model.City;
            user.Middlename = model.Middlename;
            user.Adress = model.Adress;
            user.Birthday = model.Birthday;
            user.IsMale = model.IsMale;
            user.Mobile = model.Mobile;
            user.Telephone = model.Telephone;
            user.TelephoneCode = model.TelephoneCode;
            user.MobileCode = model.MobileCode;
            user.PassportnNumber = model.PassportnNumber;
            user.PassportSerial = model.PassportSerial;
            user.PassportWhen = model.PassportWhen;
            user.PassportWhere = model.PassportWhere;
            user.PassportIssued = model.PassportIssued;
            var identityResult = await _userManager.UpdateAsync(user);
            result.IsSuccessful = identityResult.Succeeded;
            if (!result.IsSuccessful)
            {
                result.Error = CreateProfileError.Unknown;
            }

            return result;
        }

        public async Task<ChangePasswordResult> ChangePassword(ChangePasswordModel model)
        {
            ChangePasswordResult result = new ChangePasswordResult();
            var userId = _actionContext.Value.HttpContext.User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
            var identityResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            result.IsSuccessful = identityResult.Succeeded;
            if (!result.IsSuccessful)
            {
                result.Error = ChangePasswordError.OldPasswordInvalid;
            }

            return result;
        }
    }
}
