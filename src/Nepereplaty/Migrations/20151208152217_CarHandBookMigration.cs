using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Migrations.Builders;
using Microsoft.Data.Entity.Migrations.Operations;

namespace NepereplatyMigrations
{
    public partial class CarHandBookMigration : Migration
    {
        public override void Up(MigrationBuilder migration)
        {
            migration.CreateTable(
                name: "ReleaseYear",
                columns: table => new
                {
                    Year = table.Column(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReleaseYear", x => x.Year);
                });
            migration.CreateTable(
                name: "Brand",
                columns: table => new
                {
                    YearId = table.Column(type: "int", nullable: false),
                    BrandName = table.Column(type: "nvarchar(450)", nullable: false),
                    Code = table.Column(type: "nvarchar(max)", nullable: true),
                    Id = table.Column(type: "int", nullable: false),
                    ingoId = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brand", x => new { x.YearId, x.BrandName });
                    table.ForeignKey(
                        name: "FK_Brand_ReleaseYear_YearId",
                        columns: x => x.YearId,
                        referencedTable: "ReleaseYear",
                        referencedColumn: "Year");
                });
            migration.CreateTable(
                name: "Model",
                columns: table => new
                {
                    YearId = table.Column(type: "int", nullable: false),
                    BrandName = table.Column(type: "nvarchar(450)", nullable: false),
                    ModelName = table.Column(type: "nvarchar(450)", nullable: false),
                    Code = table.Column(type: "nvarchar(max)", nullable: true),
                    Id = table.Column(type: "int", nullable: false),
                    ingoId = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Model", x => new { x.YearId, x.BrandName, x.ModelName });
                    table.ForeignKey(
                        name: "FK_Model_Brand_YearId_BrandName",
                        columns: x => new { x.YearId, x.BrandName },
                        referencedTable: "Brand",
                        referencedColumns: new[] { "YearId", "BrandName" });
                });
            migration.CreateTable(
                name: "CarBody",
                columns: table => new
                {
                    YearId = table.Column(type: "int", nullable: false),
                    BrandName = table.Column(type: "nvarchar(450)", nullable: false),
                    ModelName = table.Column(type: "nvarchar(450)", nullable: false),
                    BodyName = table.Column(type: "nvarchar(450)", nullable: false),
                    Code = table.Column(type: "nvarchar(max)", nullable: true),
                    Id = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarBody", x => new { x.YearId, x.BrandName, x.ModelName, x.BodyName });
                    table.ForeignKey(
                        name: "FK_CarBody_Model_YearId_BrandName_ModelName",
                        columns: x => new { x.YearId, x.BrandName, x.ModelName },
                        referencedTable: "Model",
                        referencedColumns: new[] { "YearId", "BrandName", "ModelName" });
                });
            migration.CreateTable(
                name: "Modification",
                columns: table => new
                {
                    YearId = table.Column(type: "int", nullable: false),
                    BrandName = table.Column(type: "nvarchar(450)", nullable: false),
                    ModelName = table.Column(type: "nvarchar(450)", nullable: false),
                    BodyName = table.Column(type: "nvarchar(450)", nullable: false),
                    ModificationName = table.Column(type: "nvarchar(450)", nullable: false),
                    Code = table.Column(type: "nvarchar(max)", nullable: true),
                    Id = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modification", x => new { x.YearId, x.BrandName, x.ModelName, x.BodyName, x.ModificationName });
                    table.ForeignKey(
                        name: "FK_Modification_CarBody_YearId_BrandName_ModelName_BodyName",
                        columns: x => new { x.YearId, x.BrandName, x.ModelName, x.BodyName },
                        referencedTable: "CarBody",
                        referencedColumns: new[] { "YearId", "BrandName", "ModelName", "BodyName" });
                });
            migration.CreateTable(
                name: "Transmission",
                columns: table => new
                {
                    YearId = table.Column(type: "int", nullable: false),
                    BrandName = table.Column(type: "nvarchar(450)", nullable: false),
                    ModelName = table.Column(type: "nvarchar(450)", nullable: false),
                    BodyName = table.Column(type: "nvarchar(450)", nullable: false),
                    ModificationName = table.Column(type: "nvarchar(450)", nullable: false),
                    TransmissionName = table.Column(type: "nvarchar(450)", nullable: false),
                    Code = table.Column(type: "nvarchar(max)", nullable: true),
                    Id = table.Column(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transmission", x => new { x.YearId, x.BrandName, x.ModelName, x.BodyName, x.ModificationName, x.TransmissionName });
                    table.ForeignKey(
                        name: "FK_Transmission_Modification_YearId_BrandName_ModelName_BodyName_ModificationName",
                        columns: x => new { x.YearId, x.BrandName, x.ModelName, x.BodyName, x.ModificationName },
                        referencedTable: "Modification",
                        referencedColumns: new[] { "YearId", "BrandName", "ModelName", "BodyName", "ModificationName" });
                });
            migration.CreateTable(
                name: "CarDetails",
                columns: table => new
                {
                    YearId = table.Column(type: "int", nullable: false),
                    BrandName = table.Column(type: "nvarchar(450)", nullable: false),
                    ModelName = table.Column(type: "nvarchar(450)", nullable: false),
                    BodyName = table.Column(type: "nvarchar(450)", nullable: false),
                    ModificationName = table.Column(type: "nvarchar(450)", nullable: false),
                    TransmissionName = table.Column(type: "nvarchar(450)", nullable: false),
                    EngineCapacity = table.Column(type: "nvarchar(max)", nullable: true),
                    EnginePower = table.Column(type: "nvarchar(max)", nullable: true),
                    EnginePowerKWt = table.Column(type: "nvarchar(max)", nullable: true),
                    EngineType = table.Column(type: "nvarchar(max)", nullable: true),
                    EngineTypeCode = table.Column(type: "nvarchar(max)", nullable: true),
                    GroupId = table.Column(type: "nvarchar(max)", nullable: true),
                    Id = table.Column(type: "int", nullable: false),
                    Model = table.Column(type: "nvarchar(max)", nullable: true),
                    Modification = table.Column(type: "nvarchar(max)", nullable: true),
                    Price = table.Column(type: "nvarchar(max)", nullable: true),
                    RsaCode = table.Column(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarDetails", x => new { x.YearId, x.BrandName, x.ModelName, x.BodyName, x.ModificationName, x.TransmissionName });
                    table.ForeignKey(
                        name: "FK_CarDetails_Transmission_YearId_BrandName_ModelName_BodyName_ModificationName_TransmissionName",
                        columns: x => new { x.YearId, x.BrandName, x.ModelName, x.BodyName, x.ModificationName, x.TransmissionName },
                        referencedTable: "Transmission",
                        referencedColumns: new[] { "YearId", "BrandName", "ModelName", "BodyName", "ModificationName", "TransmissionName" });
                });
        }

        public override void Down(MigrationBuilder migration)
        {
            migration.DropTable("CarDetails");
            migration.DropTable("Transmission");
            migration.DropTable("Modification");
            migration.DropTable("CarBody");
            migration.DropTable("Model");
            migration.DropTable("Brand");
            migration.DropTable("ReleaseYear");
        }
    }
}
