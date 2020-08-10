using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using SelectPdf;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.DbContexts;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public class OrderService : IOrderService
    {
        private WebShopContext _context;
        public OrderService(WebShopContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void CreateOrder(Order order)
        {
            if(order == null)
            {
                throw new ArgumentNullException();
            }

            if(order.OrderItems.Count == 0)
            {
                throw new Exception("You haven't selected any products.");
            }

            order.OrderItems.ToList().ForEach(x =>
            {
                var productInDb = _context.Products.FirstOrDefault(y => y.Id == x.ProductId && y.IsActive);
                if (productInDb == null)
                {
                    throw new Exception("Product(Id=" + x.ProductId + ") doesn't exist in database.");
                }

                int newStock = productInDb.Stock - x.Quantity;
                if(newStock < 0)
                {
                    throw new Exception("Quantity cannot be greater than stock.");
                }
                productInDb.Stock = newStock;

                order.TotalPrice += productInDb.Price * x.Quantity;
                order.TotalPriceDiscount += (productInDb.Price - Math.Round(productInDb.Price * (productInDb.Discount / 100.0), 0)) * x.Quantity;
            });
            order.DateTimeIssue = DateTime.Now;
            _context.Orders.Add(order);
            _context.SaveChanges();

            CreatePdfOrder();
        }

        private void CreatePdfOrder()
        {
            var order = _context.Orders.ToList().Last();
            var user = _context.Users.FirstOrDefault(x => x.Id == order.UserId);

            string html = File.ReadAllText("wwwroot/Templates/pdftemplate.html");
            html = html.Replace("{{name}}", user.Firstname + " " + user.Lastname);
            html = html.Replace("{{address}}", order.Street + " " + order.HouseNumber + ", " + order.City);
            html = html.Replace("{{email}}", user.Email);
            html = html.Replace("{{tel}}", user.PhoneNumber);

            html = html.Replace("{{num_order}}", order.Id.ToString());
            html = html.Replace("{{date_order}}", order.DateTimeIssue.ToString("dd/MM/yyyy"));
            html = html.Replace("{{date_order_rec}}", order.DateTimeIssue.AddDays(2).ToString("dd/MM/yyyy"));

            html = html.Replace("{{total_without_disc}}", order.TotalPrice.ToString("C", new CultureInfo("sr-Latn-RS")));
            html = html.Replace("{{discount}}", (order.TotalPrice - order.TotalPriceDiscount).ToString("C", new CultureInfo("sr-Latn-RS")));
            html = html.Replace("{{total}}", order.TotalPriceDiscount.ToString("C", new CultureInfo("sr-Latn-RS")));

            string orderItems = "";
            order.OrderItems.ForEach(x =>
            {
                var product = _context.Products.Include(x => x.Producer).FirstOrDefault(y => y.Id == x.ProductId);
                orderItems += @$"
                    <tr>
                        <td>
                            {product.Id}
                        </td>
                        <td>
                            {product.Description}
                        </td>
                        <td style=""text-align: center;"">
                            {product.Producer.ProducerName}
                        </td>
                        <td style=""text-align: center;"">
                            {x.Quantity}
                        </td>
                        <td style=""text-align: center;"">
                            {product.Discount} %
                        </td>
                        <td style=""text-align: right;"">
                            {product.Price.ToString("C", new CultureInfo("sr-Latn-RS"))}
                        </td>
                    </tr>
                ";
            });
            html = html.Replace("{{order_items}}", orderItems);


            HtmlToPdf htmlToPdf = new HtmlToPdf();
            PdfDocument pdfDocument = htmlToPdf.ConvertHtmlString(html);
            byte[] pdf = pdfDocument.Save();
            pdfDocument.Close();
            using (var fs = new FileStream("wwwroot/Orders/order_" + order.Id + ".pdf", FileMode.Create))
            {
                fs.Write(pdf, 0, pdf.Length);
            }
        }
    }
}
