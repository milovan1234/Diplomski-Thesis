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
                _context.Products.FirstOrDefault(y => y.Id == x.ProductId).Stock -= x.Quantity;
            });
            order.DateTimeIssue = DateTime.Now;
            _context.Orders.Add(order);
            _context.SaveChanges();
        }
    }
}
