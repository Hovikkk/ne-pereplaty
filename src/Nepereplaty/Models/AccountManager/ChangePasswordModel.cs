using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.AccountManager
{
    public class ChangePasswordModel
    {
        [Required]
        [StringLength(100, MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string ConfirmNewPassword { get; set; }
    }
    public class ChangePasswordResult
    {
        public bool IsSuccessful { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public ChangePasswordError? Error { get; set; }
    }
    public enum ChangePasswordError : byte
    {
        OldPasswordInvalid,
        NewPasswordInvalid,
        ConfirmPasswordInvalid,
        Unknown
    }
}
