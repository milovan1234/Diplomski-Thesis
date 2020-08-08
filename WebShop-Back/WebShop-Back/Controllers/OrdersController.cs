using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShop_Back.Models;
using WebShop_Back.Services;

namespace WebShop_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService)
        {
            this._orderService = orderService;
        }

        [HttpPost("checkout")]
        [Authorize(Roles = "User")]
        public IActionResult Checkout([FromBody] Order order)
        {
            var userId = this.User.Claims.ToArray()[0].Value;
            if(order.UserId != int.Parse(userId))
            {
                return BadRequest();
            }
            try
            {
                _orderService.CreateOrder(order);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
