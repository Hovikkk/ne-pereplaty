using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations.Infrastructure;
using Nepereplaty.DataSources.SQLDatabase;

namespace NepereplatyMigrations
{
    [ContextType(typeof(ApplicationDbContext))]
    partial class migration0019
    {
        public override string Id
        {
            get { return "20151218002736_migration0019"; }
        }

        public override string ProductVersion
        {
            get { return "7.0.0-beta6-13815"; }
        }

        public override void BuildTargetModel(ModelBuilder builder)
        {
            builder
                .Annotation("ProductVersion", "7.0.0-beta6-13815")
                .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn");

            builder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .ConcurrencyToken();

                    b.Property<string>("Name")
                        .Annotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .Annotation("MaxLength", 256);

                    b.Key("Id");

                    b.Index("NormalizedName")
                        .Annotation("Relational:Name", "RoleNameIndex");

                    b.Annotation("Relational:TableName", "AspNetRoles");
                });

            builder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId");

                    b.Key("Id");

                    b.Annotation("Relational:TableName", "AspNetRoleClaims");
                });

            builder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId");

                    b.Key("Id");

                    b.Annotation("Relational:TableName", "AspNetUserClaims");
                });

            builder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId");

                    b.Key("LoginProvider", "ProviderKey");

                    b.Annotation("Relational:TableName", "AspNetUserLogins");
                });

            builder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.Key("UserId", "RoleId");

                    b.Annotation("Relational:TableName", "AspNetUserRoles");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("Adress");

                    b.Property<DateTime?>("Birthday");

                    b.Property<string>("City");

                    b.Property<string>("ConcurrencyStamp")
                        .ConcurrencyToken();

                    b.Property<string>("Email")
                        .Annotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("IsMale");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("Middlename");

                    b.Property<string>("Mobile");

                    b.Property<string>("MobileCode");

                    b.Property<string>("Name");

                    b.Property<string>("NormalizedEmail")
                        .Annotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .Annotation("MaxLength", 256);

                    b.Property<string>("Passport");

                    b.Property<string>("PassportIssued");

                    b.Property<string>("PassportSerial");

                    b.Property<DateTime?>("PassportWhen");

                    b.Property<string>("PassportWhere");

                    b.Property<string>("PassportnNumber");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<string>("Surname");

                    b.Property<string>("Telephone");

                    b.Property<string>("TelephoneCode");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .Annotation("MaxLength", 256);

                    b.Property<string>("comments");

                    b.Property<bool>("isAdmin");

                    b.Key("Id");

                    b.Index("NormalizedEmail")
                        .Annotation("Relational:Name", "EmailIndex");

                    b.Index("NormalizedUserName")
                        .Annotation("Relational:Name", "UserNameIndex");

                    b.Annotation("Relational:TableName", "AspNetUsers");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.Brand", b =>
                {
                    b.Property<int>("YearId")
                        .Annotation("Relational:ColumnOrder", 1);

                    b.Property<string>("BrandName")
                        .Annotation("Relational:ColumnOrder", 2);

                    b.Property<string>("Code");

                    b.Property<int>("Id");

                    b.Property<string>("ingoId");

                    b.Key("YearId", "BrandName");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.CarBody", b =>
                {
                    b.Property<int>("YearId")
                        .Annotation("Relational:ColumnOrder", 1);

                    b.Property<string>("BrandName")
                        .Annotation("Relational:ColumnOrder", 2);

                    b.Property<string>("ModelName")
                        .Annotation("Relational:ColumnOrder", 3);

                    b.Property<string>("BodyName")
                        .Annotation("Relational:ColumnOrder", 4);

                    b.Property<string>("Code");

                    b.Property<string>("Id");

                    b.Key("YearId", "BrandName", "ModelName", "BodyName");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.CarDetails", b =>
                {
                    b.Property<int>("YearId")
                        .Annotation("Relational:ColumnOrder", 1);

                    b.Property<string>("BrandName")
                        .Annotation("Relational:ColumnOrder", 2);

                    b.Property<string>("ModelName")
                        .Annotation("Relational:ColumnOrder", 3);

                    b.Property<string>("BodyName")
                        .Annotation("Relational:ColumnOrder", 4);

                    b.Property<string>("ModificationName")
                        .Annotation("Relational:ColumnOrder", 5);

                    b.Property<string>("TransmissionName")
                        .Annotation("Relational:ColumnOrder", 6);

                    b.Property<string>("EngineCapacity");

                    b.Property<string>("EnginePower");

                    b.Property<string>("EnginePowerKWt");

                    b.Property<string>("EngineType");

                    b.Property<string>("EngineTypeCode");

                    b.Property<string>("GroupId");

                    b.Property<int>("Id");

                    b.Property<string>("Model");

                    b.Property<string>("Modification");

                    b.Property<string>("Price");

                    b.Property<string>("RsaCode");

                    b.Key("YearId", "BrandName", "ModelName", "BodyName", "ModificationName", "TransmissionName");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.CompanyModel.Company", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("address");

                    b.Property<string>("comments");

                    b.Property<string>("contactName");

                    b.Property<string>("email");

                    b.Property<string>("insurances");

                    b.Property<string>("name");

                    b.Property<string>("telephone");

                    b.Key("id");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.Model", b =>
                {
                    b.Property<int>("YearId")
                        .Annotation("Relational:ColumnOrder", 1);

                    b.Property<string>("BrandName")
                        .Annotation("Relational:ColumnOrder", 2);

                    b.Property<string>("ModelName")
                        .Annotation("Relational:ColumnOrder", 3);

                    b.Property<string>("Code");

                    b.Property<int>("Id");

                    b.Property<string>("ingoId");

                    b.Key("YearId", "BrandName", "ModelName");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.Modification", b =>
                {
                    b.Property<int>("YearId")
                        .Annotation("Relational:ColumnOrder", 1);

                    b.Property<string>("BrandName")
                        .Annotation("Relational:ColumnOrder", 2);

                    b.Property<string>("ModelName")
                        .Annotation("Relational:ColumnOrder", 3);

                    b.Property<string>("BodyName")
                        .Annotation("Relational:ColumnOrder", 4);

                    b.Property<string>("ModificationName")
                        .Annotation("Relational:ColumnOrder", 5);

                    b.Property<string>("Code");

                    b.Property<string>("Id");

                    b.Key("YearId", "BrandName", "ModelName", "BodyName", "ModificationName");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.OfferModel.AccidentOffer", b =>
                {
                    b.Property<long>("offerId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("amateurSports");

                    b.Property<long>("duration");

                    b.Property<string>("insured");

                    b.Property<bool>("isSelf");

                    b.Key("offerId");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.OfferModel.CascoOffer", b =>
                {
                    b.Property<long>("offerId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("brand");

                    b.Property<string>("carBody");

                    b.Property<string>("drivers");

                    b.Property<string>("model");

                    b.Key("offerId");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.OfferModel.Driver", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("age");

                    b.Property<long>("experience");

                    b.Property<bool>("isMale");

                    b.Property<long>("kids");

                    b.Property<long>("martialStatus");

                    b.Key("id");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.OfferModel.HouseOffer", b =>
                {
                    b.Property<long>("offerID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("address");

                    b.Property<string>("city");

                    b.Property<string>("region");

                    b.Key("offerID");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.OfferModel.Insured", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("age");

                    b.Property<string>("middleName");

                    b.Property<string>("name");

                    b.Property<string>("surName");

                    b.Key("id");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.OfferModel.Offer", b =>
                {
                    b.Property<long>("offerId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("buyer");

                    b.Property<DateTime?>("closeData");

                    b.Property<string>("comments");

                    b.Property<long>("companyId");

                    b.Property<float>("cost");

                    b.Property<long>("dataId");

                    b.Property<string>("endDate");

                    b.Property<bool>("purchas");

                    b.Property<string>("startDate");

                    b.Property<string>("type");

                    b.Key("offerId");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.OfferModel.OsagoOffer", b =>
                {
                    b.Property<long>("offerId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("brand");

                    b.Property<string>("carBody");

                    b.Property<string>("drivers");

                    b.Property<string>("model");

                    b.Key("offerId");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.OfferModel.TravelingOffer", b =>
                {
                    b.Property<long>("offerID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("countries");

                    b.Property<long>("duration");

                    b.Property<string>("insureds");

                    b.Property<long>("type");

                    b.Key("offerID");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.ReleaseYear", b =>
                {
                    b.Property<int>("Year");

                    b.Key("Year");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.Transmission", b =>
                {
                    b.Property<int>("YearId")
                        .Annotation("Relational:ColumnOrder", 1);

                    b.Property<string>("BrandName")
                        .Annotation("Relational:ColumnOrder", 2);

                    b.Property<string>("ModelName")
                        .Annotation("Relational:ColumnOrder", 3);

                    b.Property<string>("BodyName")
                        .Annotation("Relational:ColumnOrder", 4);

                    b.Property<string>("ModificationName")
                        .Annotation("Relational:ColumnOrder", 5);

                    b.Property<string>("TransmissionName")
                        .Annotation("Relational:ColumnOrder", 6);

                    b.Property<string>("Code");

                    b.Property<int>("Id");

                    b.Key("YearId", "BrandName", "ModelName", "BodyName", "ModificationName", "TransmissionName");
                });

            builder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.Reference("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .InverseCollection()
                        .ForeignKey("RoleId");
                });

            builder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.Reference("Nepereplaty.DataSources.SQLDatabase.ApplicationUser")
                        .InverseCollection()
                        .ForeignKey("UserId");
                });

            builder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.Reference("Nepereplaty.DataSources.SQLDatabase.ApplicationUser")
                        .InverseCollection()
                        .ForeignKey("UserId");
                });

            builder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.Reference("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .InverseCollection()
                        .ForeignKey("RoleId");

                    b.Reference("Nepereplaty.DataSources.SQLDatabase.ApplicationUser")
                        .InverseCollection()
                        .ForeignKey("UserId");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.Brand", b =>
                {
                    b.Reference("Nepereplaty.DataSources.SQLDatabase.ReleaseYear")
                        .InverseCollection()
                        .ForeignKey("YearId");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.CarBody", b =>
                {
                    b.Reference("Nepereplaty.DataSources.SQLDatabase.Model")
                        .InverseCollection()
                        .ForeignKey("YearId", "BrandName", "ModelName");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.CarDetails", b =>
                {
                    b.Reference("Nepereplaty.DataSources.SQLDatabase.Transmission")
                        .InverseReference()
                        .ForeignKey("Nepereplaty.DataSources.SQLDatabase.CarDetails", "YearId", "BrandName", "ModelName", "BodyName", "ModificationName", "TransmissionName");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.Model", b =>
                {
                    b.Reference("Nepereplaty.DataSources.SQLDatabase.Brand")
                        .InverseCollection()
                        .ForeignKey("YearId", "BrandName");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.Modification", b =>
                {
                    b.Reference("Nepereplaty.DataSources.SQLDatabase.CarBody")
                        .InverseCollection()
                        .ForeignKey("YearId", "BrandName", "ModelName", "BodyName");
                });

            builder.Entity("Nepereplaty.DataSources.SQLDatabase.Transmission", b =>
                {
                    b.Reference("Nepereplaty.DataSources.SQLDatabase.Modification")
                        .InverseCollection()
                        .ForeignKey("YearId", "BrandName", "ModelName", "BodyName", "ModificationName");
                });
        }
    }
}
