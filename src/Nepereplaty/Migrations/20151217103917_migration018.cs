using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class migration018 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.AddColumn(
                name: "isAdmin",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropColumn(name: "isAdmin", table: "AspNetUsers");
        }
    }
}
