using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class migration001 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.DropColumn(name: "NameEn", table: "AspNetUsers");
            migration.DropColumn(name: "SurnameEn", table: "AspNetUsers");
            migration.AddColumn(
                name: "Middlename",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "MobileCode",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "PassportIssued",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "PassportSerial",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "PassportWhen",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: true);
            migration.AddColumn(
                name: "PassportWhere",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "PassportnNumber",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "TelephoneCode",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropColumn(name: "Middlename", table: "AspNetUsers");
            migration.DropColumn(name: "MobileCode", table: "AspNetUsers");
            migration.DropColumn(name: "PassportIssued", table: "AspNetUsers");
            migration.DropColumn(name: "PassportSerial", table: "AspNetUsers");
            migration.DropColumn(name: "PassportWhen", table: "AspNetUsers");
            migration.DropColumn(name: "PassportWhere", table: "AspNetUsers");
            migration.DropColumn(name: "PassportnNumber", table: "AspNetUsers");
            migration.DropColumn(name: "TelephoneCode", table: "AspNetUsers");
            migration.AddColumn(
                name: "NameEn",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
            migration.AddColumn(
                name: "SurnameEn",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
