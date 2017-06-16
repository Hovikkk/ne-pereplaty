using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Middlename { get; set; }
        public bool IsMale { get; set; }
       
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
       
        public DateTime? PassportWhen { get; set; }
        public string PassportIssued { get; set; }

        public string comments { get; set; }
        public bool isAdmin { get; set; }

        public static implicit operator string (ApplicationUser v)
        {
            throw new NotImplementedException();
        }
    }
}
