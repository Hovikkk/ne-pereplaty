using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class migration007 : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.CreateTable(
                name: "Driver",
                columns: table => new
                {
                    id = table.Column(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", "IdentityColumn"),
                    age = table.Column(type: "bigint", nullable: false),
                    experience = table.Column(type: "bigint", nullable: false),
                    isMale = table.Column(type: "bit", nullable: false),
                    kids = table.Column(type: "bigint", nullable: false),
                    martialStatus = table.Column(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Driver", x => x.id);
                });
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
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropTable("Driver");
            migration.DropTable("Insured");
        }
    }
}
