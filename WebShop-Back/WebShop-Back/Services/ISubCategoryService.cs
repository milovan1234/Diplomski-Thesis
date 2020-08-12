using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public interface ISubCategoryService
    {
        IEnumerable<SubCategory> GetSubCategories();
        IEnumerable<SubCategory> GetSubCategoriesForCategory(int categoryId);
    }
}
