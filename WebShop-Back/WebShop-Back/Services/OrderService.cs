using System;
using System.Collections.Generic;
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
                order.TotalPriceDiscount += (productInDb.Price - (productInDb.Price * (productInDb.Discount/100.0))) * x.Quantity;
            });
            order.DateTimeIssue = DateTime.Now;
            _context.Orders.Add(order);
            _context.SaveChanges();
        }
    }
}
