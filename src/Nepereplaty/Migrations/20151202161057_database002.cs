using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class database002 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.CreateTable(
                name: "Company",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    address = table.Column(type: "nvarchar(max)", nullable: true),
                    comments = table.Column(type: "nvarchar(max)", nullable: true),
                    contactName = table.Column(type: "nvarchar(max)", nullable: true),
                    email = table.Column(type: "nvarchar(max)", nullable: true),
                    name = table.Column(type: "nvarchar(max)", nullable: true),
                    telephone = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Company", x => x.id);
                });
            migration.CreateTable(
                name: "AccidentOffer",
                columns: table => new
                {
                    offerId = table.Column(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    amateurSports = table.Column(type: "bit", nullable: false),
                    duration = table.Column(type: "bigint", nullable: false),
                    insuredid = table.Column(type: "int", nullable: true),
                    isSelf = table.Column(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccidentOffer", x => x.offerId);
                    table.ForeignKey(
                        name: "FK_AccidentOffer_Insured_insuredid",
                        columns: x => x.insuredid,
                        referencedTable: "Insured",
                        referencedColumn: "id");
                });
            migration.CreateTable(
                name: "CascoOffer",
                columns: table => new
                {
                    offerId = table.Column(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    brand = table.Column(type: "nvarchar(max)", nullable: true),
                    carBody = table.Column(type: "nvarchar(max)", nullable: true),
                    model = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CascoOffer", x => x.offerId);
                });
            migration.CreateTable(
                name: "HouseOffer",
                columns: table => new
                {
                    offerID = table.Column(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    address = table.Column(type: "nvarchar(max)", nullable: true),
                    city = table.Column(type: "nvarchar(max)", nullable: true),
                    @region = table.Column(name: "region", type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HouseOffer", x => x.offerID);
                });
            migration.CreateTable(
                name: "OsagoOffer",
                columns: table => new
                {
                    offerId = table.Column(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    brand = table.Column(type: "nvarchar(max)", nullable: true),
                    carBody = table.Column(type: "nvarchar(max)", nullable: true),
                    model = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OsagoOffer", x => x.offerId);
                });
            migration.CreateTable(
                name: "TravelingOffer",
                columns: table => new
                {
                    offerID = table.Column(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    duration = table.Column(type: "bigint", nullable: false),
                    @type = table.Column(name: "type", type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TravelingOffer", x => x.offerID);
                });
            migration.CreateTable(
                name: "Insurance",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    Companyid = table.Column(type: "int", nullable: true),
                    info = table.Column(type: "nvarchar(max)", nullable: true),
                    name = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insurance", x => x.id);
                    table.ForeignKey(
                        name: "FK_Insurance_Company_Companyid",
                        columns: x => x.Companyid,
                        referencedTable: "Company",
                        referencedColumn: "id");
                });
            migration.CreateTable(
                name: "Driver",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    CascoOfferofferId = table.Column(type: "bigint", nullable: true),
                    OsagoOfferofferId = table.Column(type: "bigint", nullable: true),
                    age = table.Column(type: "bigint", nullable: false),
                    experience = table.Column(type: "bigint", nullable: false),
                    isMale = table.Column(type: "bit", nullable: false),
                    kids = table.Column(type: "bigint", nullable: false),
                    martialStatus = table.Column(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Driver", x => x.id);
                    table.ForeignKey(
                        name: "FK_Driver_CascoOffer_CascoOfferofferId",
                        columns: x => x.CascoOfferofferId,
                        referencedTable: "CascoOffer",
                        referencedColumn: "offerId");
                    table.ForeignKey(
                        name: "FK_Driver_OsagoOffer_OsagoOfferofferId",
                        columns: x => x.OsagoOfferofferId,
                        referencedTable: "OsagoOffer",
                        referencedColumn: "offerId");
                });
            migration.AddColumn(
                name: "TravelingOfferofferID",
                table: "Insured",
                type: "bigint",
                nullable: true);
            migration.AddForeignKey(
                name: "FK_Insured_TravelingOffer_TravelingOfferofferID",
                table: "Insured",
                column: "TravelingOfferofferID",
                referencedTable: "TravelingOffer",
                referencedColumn: "offerID");
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropForeignKey(name: "FK_Insured_TravelingOffer_TravelingOfferofferID", table: "Insured");
            migration.DropColumn(name: "TravelingOfferofferID", table: "Insured");
            migration.DropTable("Insurance");
            migration.DropTable("AccidentOffer");
            migration.DropTable("Driver");
            migration.DropTable("HouseOffer");
            migration.DropTable("TravelingOffer");
            migration.DropTable("Company");
            migration.DropTable("CascoOffer");
            migration.DropTable("OsagoOffer");
        }
    }
}
