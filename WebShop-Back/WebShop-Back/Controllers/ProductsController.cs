using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using WebShop_Back.Models;
using WebShop_Back.Services;

namespace WebShop_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService productService)
        {
            this._productService = productService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetProducts()
        {
            return Ok(_productService.GetProducts());
        }

        [HttpGet("{productId}")]
        public IActionResult GetProduct(int productId)
        {
            var product = _productService.GetProduct(productId);
            if(product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("{productId}/photo")]
        public IActionResult GetImageForProduct(int productId)
        {
            var image = _productService.GetImageForProduct(productId);
            if (image == null)
            {
                return NotFound();
            }

            return Ok(File(image,"image/*"));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateProduct([FromForm] Product product)
        {
            try
            {
                _productService.CreateProduct(product);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{productId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateProduct([FromRoute] int productId, [FromForm] Product product)
        {
            try
            {
                _productService.UpdateProduct(productId, product);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{productId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteProduct([FromRoute] int productId)
        {
            try
            {
                _productService.DeleteProduct(productId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
