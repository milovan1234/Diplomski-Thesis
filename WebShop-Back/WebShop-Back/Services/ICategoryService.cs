using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public interface ICategoryService
    {
        IEnumerable<Category> GetCategories();
        void AddCategory(Category category);
        void UpdateCategory(int id, Category category);
        void DeleteCategory(int id);
    }
}
