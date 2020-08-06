using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.DbContexts;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public class ProductService : IProductService
    {
        private readonly WebShopContext _context;
        public ProductService(WebShopContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void CreateProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException();
            }
            string image = Path.GetFileNameWithoutExtension(product.Image.FileName);
            product.ImagePath = Path.Combine("wwwroot/Images", product.Image.FileName)
                                                                .Replace(image,image + Guid.NewGuid());
            SaveImage(product.Image, product.ImagePath);

            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public IEnumerable<Product> GetProducts()
        {
            return _context.Products.Include(x => x.Producer)
                                    .Include(x => x.SubCategory)
                                    .Where(x => x.IsActive);
        }

        public IEnumerable<Product> GetNonActiveProducts()
        {
            return _context.Products.Include(x => x.Producer)
                                    .Include(x => x.SubCategory)
                                    .Where(x => !x.IsActive);
        }

        public IEnumerable<Product> GetProductsForSubCategory(int subCategoryId)
        {
            return _context.Products
                              .Include(x => x.Producer)
                              .Include(x => x.SubCategory)
                              .Where(x => x.SubCategoryId == subCategoryId && x.IsActive);
        }

        public Product GetProduct(int id)
        {
            return _context.Products.Include(x => x.Producer)
                                    .Include(x => x.SubCategory)
                                    .FirstOrDefault(x => x.Id == id && x.IsActive);
        }

        public Product GetNonActiveProduct(int id)
        {
            return _context.Products.Include(x => x.Producer)
                                    .Include(x => x.SubCategory)
                                    .FirstOrDefault(x => x.Id == id && !x.IsActive);
        }

        public byte[] GetImageForProduct(int id)
        {
            var product = _context.Products.FirstOrDefault(x => x.Id == id);
            if(product == null)
            {
                return null;
            }

            return File.ReadAllBytes(product.ImagePath);
        }

        public void UpdateProduct(int id, Product product)
        {
            if(product == null)
            {
                throw new ArgumentNullException();
            }

            var productInDb = _context.Products.FirstOrDefault(x => x.Id == id);
            if (productInDb == null)
            {
                throw new Exception("Product doesn't exist in database.");
            }

            File.Delete(productInDb.ImagePath);
            string image = Path.GetFileNameWithoutExtension(product.Image.FileName);
            productInDb.ImagePath = Path.Combine("wwwroot/Images", product.Image.FileName)
                                                                .Replace(image, image + Guid.NewGuid());
            SaveImage(product.Image, productInDb.ImagePath);

            productInDb.ProducerId = product.ProducerId;
            productInDb.SubCategoryId = product.SubCategoryId;
            productInDb.Price = product.Price;
            productInDb.Discount = product.Discount;
            productInDb.IsActive = product.IsActive;
            productInDb.Stock = product.Stock;
            productInDb.Description = product.Description;

            _context.SaveChanges();
        }

        public void DeleteProduct(int id)
        {
            var productInDb = _context.Products.FirstOrDefault(x => x.Id == id);
            if (productInDb == null)
            {
                throw new Exception("Product doesn't exist in database.");
            }
            File.Delete(productInDb.ImagePath);
            _context.Products.Remove(productInDb);
            _context.SaveChanges();
        }

        public void ChangeActivityProduct(int id, bool activity)
        {
            var productInDb = _context.Products.FirstOrDefault(x => x.Id == id);
            if (productInDb == null)
            {
                throw new Exception("Product doesn't exist in database.");
            }

            productInDb.IsActive = activity;
            _context.SaveChanges();
        }

        private void SaveImage(IFormFile image, string imagePath)
        {
            using (FileStream fileStream = new FileStream(imagePath, FileMode.Create))
            {
                image.CopyTo(fileStream);
            }
        }
    }
}
