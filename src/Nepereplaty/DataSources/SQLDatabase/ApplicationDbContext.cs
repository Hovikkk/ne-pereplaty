using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Nepereplaty.DataSources.SQLDatabase.CompanyModel;
using Nepereplaty.DataSources.SQLDatabase.OfferModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nepereplaty.DataSources.SQLDatabase
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        //TODO: This needed to be deleted when EF7 auto migrations work
        #region Helpers
        // The following code creates the database and schema if they don't exist.
        // This is a temporary workaround since deploying database through EF migrations is
        // not yet supported in this release.
        // Please see this http://go.microsoft.com/fwlink/?LinkID=615859 for more information on how to do deploy the database
        // when publishing your application.
        private static bool _databaseChecked;

        public DbSet<Offer> offers { get; set; }
        public DbSet<Company> company { get; set; }
        public DbSet<AccidentOffer> accident { get; set; }
        public DbSet<CascoOffer> casco { get; set; }
        public DbSet<HouseOffer> house { get; set; }
        public DbSet<OsagoOffer> osago { get; set; }
        public DbSet<TravelingOffer> traveling { get; set; }
        public DbSet<Insured> insured { get; set; }
        public DbSet<Driver> driver { get; set; }
        public DbSet<ReleaseYear> Years { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<CarBody> CarBodies { get; set; }
        public DbSet<Modification> Modifications { get; set; }
        public DbSet<Transmission> Transmissions { get; set; }
        public DbSet<CarDetails> Details { get; set; }


        public static void EnsureDatabaseCreated(ApplicationDbContext context)
        {
            if (!_databaseChecked)
            {
                
                _databaseChecked = true;
                context.Database.ApplyMigrations();
            }
        }
        #endregion

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Brand>()
                .Key(k => new { k.YearId, k.BrandName });

            builder.Entity<Model>()
                .Key(k => new { k.YearId, k.BrandName, k.ModelName });

            builder.Entity<CarBody>()
                .Key(k => new { k.YearId, k.BrandName, k.ModelName, k.BodyName });

            builder.Entity<Modification>()
                .Key(k => new { k.YearId, k.BrandName, k.ModelName, k.BodyName, k.ModificationName });

            builder.Entity<Transmission>()
                .Key(k => new { k.YearId, k.BrandName, k.ModelName, k.BodyName, k.ModificationName, k.TransmissionName });

            builder.Entity<CarDetails>()
                .Key(k => new { k.YearId, k.BrandName, k.ModelName, k.BodyName, k.ModificationName, k.TransmissionName });

            builder.Entity<CarDetails>()
                .Reference(k => k.Transmission)
                .InverseReference(k => k.Details)
                .ForeignKey<CarDetails>(k => new { k.YearId, k.BrandName, k.ModelName, k.BodyName, k.ModificationName, k.TransmissionName });

            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
