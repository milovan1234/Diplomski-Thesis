using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.DbContexts;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly WebShopContext _context;
        public SubCategoryService(WebShopContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IEnumerable<SubCategory> GetSubCategoriesForCategory(int categoryId)
        {            
            return _context.SubCategories.Include(x => x.Category).Where(x => x.CategoryId == categoryId);
        }

        public IEnumerable<SubCategory> GetSubCategories()
        {
            return _context.SubCategories.Include(x => x.Category);
        }

        private bool SubCategoryExist(SubCategory subCategory)
        {
            return _context.SubCategories.Any(x => x.SubCategoryName == subCategory.SubCategoryName);
        }
    }
}
