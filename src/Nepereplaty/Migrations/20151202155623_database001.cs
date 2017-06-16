using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class database001 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.CreateTable(
                name: "Insured",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    age = table.Column(type: "nvarchar(max)", nullable: true),
                    middleName = table.Column(type: "nvarchar(max)", nullable: true),
                    name = table.Column(type: "nvarchar(max)", nullable: true),
                    surName = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insured", x => x.id);
                });
            migration.CreateTable(
                name: "Offer",
                columns: table => new
                {
                    offerId = table.Column(type: "bigint", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    buyerid = table.Column(type: "int", nullable: true),
                    comments = table.Column(type: "nvarchar(max)", nullable: true),
                    cost = table.Column(type: "bigint", nullable: false),
                    dataId = table.Column(type: "bigint", nullable: false),
                    endDate = table.Column(type: "datetime2", nullable: true),
                    startDate = table.Column(type: "datetime2", nullable: true),
                    @type = table.Column(name: "type", type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offer", x => x.offerId);
                    table.ForeignKey(
                        name: "FK_Offer_Insured_buyerid",
                        columns: x => x.buyerid,
                        referencedTable: "Insured",
                        referencedColumn: "id");
                });
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropTable("Offer");
            migration.DropTable("Insured");
        }
    }
}
