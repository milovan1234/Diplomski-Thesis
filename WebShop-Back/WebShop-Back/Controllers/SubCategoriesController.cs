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
    [Route("api/categories/{categoryId}/[controller]")]
    [ApiController]
    public class SubCategoriesController : ControllerBase
    {
        private readonly ISubCategoryService _subCategoryService;
        public SubCategoriesController(ISubCategoryService subCategoryService)
        {
            this._subCategoryService = subCategoryService;
        }
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetSubCategoriesForCategory([FromRoute] int categoryId)
        {
            return Ok(_subCategoryService.GetSubCategoriesForCategory(categoryId));
        }
    }
}
