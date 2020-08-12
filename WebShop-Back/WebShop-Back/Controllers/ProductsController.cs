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
        public IActionResult GetAllProducts()
        {
            return Ok(_productService.GetProducts());
        }

        [HttpGet("~/api/deleted-products")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetDeletedProducts()
        {
            return Ok(_productService.GetDeletedProducts());
        }


        [HttpGet("~/api/subcategories/{subCategoryId}/[controller]")]
        public IActionResult GetProductsForSubCategory([FromRoute] int subCategoryId)
        {
            return Ok(_productService.GetProductsForSubCategory(subCategoryId));
        }


        [HttpGet("{productId}")]
        public IActionResult GetProduct([FromRoute] int productId)
        {
            var product = _productService.GetProduct(productId);
            if(product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("~/api/deleted-products/{productId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetDeletedProduct([FromRoute] int productId)
        {
            var product = _productService.GetDeletedProduct(productId);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
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

        [HttpPut("~/api/deleted-products/{productId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult RestoreDeletedProduct([FromRoute] int productId)
        {
            try
            {
                _productService.RestoreDeletedProduct(productId);
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
