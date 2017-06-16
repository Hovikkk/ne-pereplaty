using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class migration0019 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.AlterColumn(
                name: "cost",
                table: "Offer",
                type: "real",
                nullable: false);
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.AlterColumn(
                name: "cost",
                table: "Offer",
                type: "bigint",
                nullable: false);
        }
    }
}
