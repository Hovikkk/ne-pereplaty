using System.Threading.Tasks;

namespace Nepereplaty.Models.AccountManager
{
    public interface IAccountManager
    {
        Task<LoginResult> CheckUser();
        Task<LoginResult> CheckAdminUser();
        Task<LoginResult> Login(LoginModel model);
        Task<LoginResult> LoginAdmin(LoginModel model);
        Task<ChangePasswordResult> ChangePassword(ChangePasswordModel model);
        void Logout();
        Task<RegisterResult> Register(RegisterModel model);
        Task<ProfileModel> GetProfile();
        Task<ProfileResult> EditProfile(ProfileModel model);
    }
}