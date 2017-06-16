using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class migration0015 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.AddColumn(
                name: "closeData",
                table: "Offer",
                type: "datetime2",
                nullable: true);
            migration.AddColumn(
                name: "purchas",
                table: "Offer",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropColumn(name: "closeData", table: "Offer");
            migration.DropColumn(name: "purchas", table: "Offer");
        }
    }
}
