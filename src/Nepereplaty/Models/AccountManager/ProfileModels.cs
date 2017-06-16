using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.Models.AccountManager
{
    public class ProfileModel
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Middlename { get; set; }
        public bool IsMale { get; set; }
        [DataType(DataType.Date)]
        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTime? Birthday { get; set; }
        public string City { get; set; }
        public string Adress { get; set; }
        public string Passport { get; set; }
        public string Telephone { get; set; }
        public string Mobile { get; set; }
        public string TelephoneCode { get; set; }
        public string MobileCode { get; set; }
        public string PassportnNumber { get; set; }
        public string PassportSerial { get; set; }
        public string PassportWhere { get; set; }
        [DataType(DataType.Date)]
        [JsonConverter(typeof(IsoDateTimeConverter))]
        public DateTime? PassportWhen { get; set; }
        public string PassportIssued { get; set; }
        public string comments { get; set; }
        public bool isAdmin { get; set; }
    }

    public class ProfileResult
    {
        public bool IsSuccessful { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public CreateProfileError? Error { get; set; }
    }

    public enum CreateProfileError : byte
    {
        Unknown
    }
}
