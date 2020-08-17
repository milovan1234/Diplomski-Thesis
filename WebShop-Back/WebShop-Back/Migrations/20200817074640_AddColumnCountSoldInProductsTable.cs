using Microsoft.EntityFrameworkCore.Migrations;

namespace WebShop_Back.Migrations
{
    public partial class AddColumnCountSoldInProductsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountSold",
                table: "Products",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountSold",
                table: "Products");
        }
    }
}
