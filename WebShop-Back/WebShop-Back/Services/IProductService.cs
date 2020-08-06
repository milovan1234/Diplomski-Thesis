using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public interface IProductService
    {
        IEnumerable<Product> GetProducts();
        IEnumerable<Product> GetNonActiveProducts();
        IEnumerable<Product> GetProductsForSubCategory(int subCategoryId);
        Product GetProduct(int id);
        Product GetNonActiveProduct(int id);
        byte[] GetImageForProduct(int id);
        void CreateProduct(Product product);
        void UpdateProduct(int id, Product product);
        void ChangeActivityProduct(int id, bool activity);
        void DeleteProduct(int id);
    }
}
