using System;

namespace Nepereplaty.Services.TRAVELING
{
    public class InsuredPersons
    {
        public string BirthDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public InsuredPersons(string v)
        {
            this.BirthDate = v;
            this.FirstName = "Aghasi";
            this.LastName = "Gyurjoghlyan";
        }
    }
}