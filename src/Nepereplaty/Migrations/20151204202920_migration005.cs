using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class migration005 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.DropForeignKey(name: "FK_AccidentOffer_Insured_insuredid", table: "AccidentOffer");
            migration.DropForeignKey(name: "FK_Offer_Insured_buyerid", table: "Offer");
            migration.DropColumn(name: "buyerid", table: "Offer");
            migration.DropColumn(name: "insuredid", table: "AccidentOffer");
            migration.DropTable("Driver");
            migration.DropTable("Insured");
            migration.AddColumn(
                name: "countries",
                table: "TravelingOffer",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "insureds",
                table: "TravelingOffer",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "drivers",
                table: "OsagoOffer",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "buyer",
                table: "Offer",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
            migration.AddColumn(
                name: "drivers",
                table: "CascoOffer",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "insured",
                table: "AccidentOffer",
                type: "nvarchar(max)",
                nullable: true);
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropColumn(name: "countries", table: "TravelingOffer");
            migration.DropColumn(name: "insureds", table: "TravelingOffer");
            migration.DropColumn(name: "drivers", table: "OsagoOffer");
            migration.DropColumn(name: "buyer", table: "Offer");
            migration.DropColumn(name: "drivers", table: "CascoOffer");
            migration.DropColumn(name: "insured", table: "AccidentOffer");
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
            migration.CreateTable(
                name: "Insured",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    TravelingOfferofferID = table.Column(type: "bigint", nullable: true),
                    age = table.Column(type: "nvarchar(max)", nullable: true),
                    middleName = table.Column(type: "nvarchar(max)", nullable: true),
                    name = table.Column(type: "nvarchar(max)", nullable: true),
                    surName = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insured", x => x.id);
                    table.ForeignKey(
                        name: "FK_Insured_TravelingOffer_TravelingOfferofferID",
                        columns: x => x.TravelingOfferofferID,
                        referencedTable: "TravelingOffer",
                        referencedColumn: "offerID");
                });
            migration.AddColumn(
                name: "buyerid",
                table: "Offer",
                type: "int",
                nullable: true);
            migration.AddColumn(
                name: "insuredid",
                table: "AccidentOffer",
                type: "int",
                nullable: true);
            migration.AddForeignKey(
                name: "FK_AccidentOffer_Insured_insuredid",
                table: "AccidentOffer",
                column: "insuredid",
                referencedTable: "Insured",
                referencedColumn: "id");
            migration.AddForeignKey(
                name: "FK_Offer_Insured_buyerid",
                table: "Offer",
                column: "buyerid",
                referencedTable: "Insured",
                referencedColumn: "id");
        }
    }
}
