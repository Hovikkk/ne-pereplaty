using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.AccountManager
{
    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        [Range(typeof(bool), "true", "true")]
        public bool IsAgreed { get; set; }
    }
    public class RegisterResult
    {
        public bool IsSuccessful { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public RegisterError? Error { get; set; }
    }
    public enum RegisterError : byte
    {
        NameRequired,
        SurnameRequired,
        AgreeRequired,
        EmailInvalid,
        EmailExists,
        PasswordInvalid,
        ConfirmPasswordInvalid,
        Unknown
    }
}
