using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class migration010 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.DropTable("Insurance");
            migration.AddColumn(
                name: "companyId",
                table: "Offer",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
            migration.AddColumn(
                name: "insurances",
                table: "Company",
                type: "nvarchar(max)",
                nullable: true);
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropColumn(name: "companyId", table: "Offer");
            migration.DropColumn(name: "insurances", table: "Company");
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
        }
    }
}
