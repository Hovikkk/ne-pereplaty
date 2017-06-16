using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class migration008 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.AlterColumn(
                name: "startDate",
                table: "Offer",
                type: "nvarchar(max)",
                nullable: true);
            migration.AlterColumn(
                name: "endDate",
                table: "Offer",
                type: "nvarchar(max)",
                nullable: true);
            migration.AlterColumn(
                name: "buyer",
                table: "Offer",
                type: "nvarchar(max)",
                nullable: true);
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.AlterColumn(
                name: "startDate",
                table: "Offer",
                type: "datetime2",
                nullable: true);
            migration.AlterColumn(
                name: "endDate",
                table: "Offer",
                type: "datetime2",
                nullable: true);
            migration.AlterColumn(
                name: "buyer",
                table: "Offer",
                type: "bigint",
                nullable: false);
        }
    }
}
