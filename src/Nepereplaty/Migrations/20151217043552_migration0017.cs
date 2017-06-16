using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class migration0017 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.AddColumn(
                name: "comments",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropColumn(name: "comments", table: "AspNetUsers");
        }
    }
}
