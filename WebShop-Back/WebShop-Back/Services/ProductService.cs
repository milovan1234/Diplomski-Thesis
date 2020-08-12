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
            product.IsActive = true;

            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public IEnumerable<Product> GetProducts()
        {
            var products = _context.Products.Include(x => x.Producer)
                                    .Include(x => x.SubCategory)
                                    .Where(x => x.IsActive).ToList();
            products.ForEach(x =>
            {
                x.ImageFile = GetImageForProduct(x.Id);
            });
            return products;
        }

        public IEnumerable<Product> GetDeletedProducts()
        {
            var products = _context.Products.Include(x => x.Producer)
                                    .Include(x => x.SubCategory)
                                    .Where(x => !x.IsActive).ToList();
            products.ForEach(x =>
            {
                x.ImageFile = GetImageForProduct(x.Id);
            });
            return products;
        }

        public IEnumerable<Product> GetProductsForSubCategory(int subCategoryId)
        {
            var products = _context.Products
                              .Include(x => x.Producer)
                              .Include(x => x.SubCategory)
                              .Where(x => x.SubCategoryId == subCategoryId && x.IsActive).ToList();
            products.ForEach(x =>
            {
                x.ImageFile = GetImageForProduct(x.Id);
            });
            return products;
        }

        public Product GetProduct(int id)
        {
            var product = _context.Products.Include(x => x.Producer)
                                    .Include(x => x.SubCategory)
                                    .FirstOrDefault(x => x.Id == id && x.IsActive);
            if(product == null)
            {
                return null;
            }
            product.ImageFile = GetImageForProduct(product.Id);
            return product;
        }

        public Product GetDeletedProduct(int id)
        {
            var product = _context.Products.Include(x => x.Producer)
                                     .Include(x => x.SubCategory)
                                     .FirstOrDefault(x => x.Id == id && !x.IsActive);
            if (product == null)
            {
                return null;
            }
            product.ImageFile = GetImageForProduct(product.Id);
            return product;
        }

        public byte[] GetImageForProduct(int id)
        {
            return File.ReadAllBytes(_context.Products.FirstOrDefault(x => x.Id == id).ImagePath);
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

            if (product.Image != null)
            {
                File.Delete(productInDb.ImagePath);
                string image = Path.GetFileNameWithoutExtension(product.Image.FileName);
                productInDb.ImagePath = Path.Combine("wwwroot/Images", product.Image.FileName)
                                                                    .Replace(image, image + Guid.NewGuid());
                SaveImage(product.Image, productInDb.ImagePath);
            }

            productInDb.ProducerId = product.ProducerId;
            productInDb.SubCategoryId = product.SubCategoryId;
            productInDb.Price = product.Price;
            productInDb.Discount = product.Discount;
            productInDb.Stock = product.Stock;
            productInDb.Description = product.Description;

            _context.SaveChanges();
        }
        
        public void RestoreDeletedProduct(int id)
        {
            var productInDb = _context.Products.FirstOrDefault(x => x.Id == id && !x.IsActive);
            if (productInDb == null )
            {
                throw new Exception("Product doesn't exist in database.");
            }

            productInDb.IsActive = true;
            _context.SaveChanges();
        }

        public void DeleteProduct(int id)
        {
            var productInDb = _context.Products.FirstOrDefault(x => x.Id == id);
            if (productInDb == null)
            {
                throw new Exception("Product doesn't exist in database.");
            }

            productInDb.IsActive = false;
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
