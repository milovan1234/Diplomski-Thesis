using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.DbContexts;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly WebShopContext _context;
        public CategoryService(WebShopContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void AddCategory(Category category)
        {
            if(category == null)
            {
                throw new ArgumentNullException();
            }

            if (CategoryExist(category))
            {
                throw new Exception("Category already exist in database.");
            }

            _context.Categories.Add(category);
            _context.SaveChanges();
        }
               
        public IEnumerable<Category> GetCategories()
        {
            return _context.Categories;
        }

        public void UpdateCategory(int id, Category category)
        {
            if(category == null)
            {
                throw new ArgumentNullException();
            }

            var categoryInDb = _context.Categories.FirstOrDefault(x => x.Id == id);
            if(categoryInDb == null)
            {
                throw new Exception("Category doesn't exist in database.");
            }

            categoryInDb.CategoryName = category.CategoryName;
            _context.SaveChanges();
        }
        public void DeleteCategory(int id)
        {
            var categoryInDb = _context.Categories.FirstOrDefault(x => x.Id == id);
            if (categoryInDb == null)
            {
                throw new Exception("Category doesn't exist in database.");
            }

            _context.Categories.Remove(categoryInDb);
            _context.SaveChanges();
        }

        private bool CategoryExist(Category category)
        {
            return _context.Categories.Any(x => x.CategoryName == category.CategoryName);
        }
    }
}
