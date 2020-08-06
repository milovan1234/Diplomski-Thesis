using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.DbContexts;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public class ProducerService : IProducerService
    {
        private readonly WebShopContext _context;
        public ProducerService(WebShopContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void CreateProducer(Producer producer)
        {
            if(producer == null)
            {
                throw new ArgumentNullException();
            }

            if (ProducerExist(producer))
            {
                throw new Exception("Producer already exist in database.");
            }

            _context.Producers.Add(producer);
            _context.SaveChanges();
        }        

        public IEnumerable<Producer> GetProducers()
        {
            return _context.Producers;
        }
        public IEnumerable<Producer> GetProducersForSubCategory(int subCategoryId)
        {
            List<Producer> producers = new List<Producer>();
            _context.Products.Include(x => x.Producer).ToList().ForEach(x =>
            {
                if(x.SubCategoryId == subCategoryId)
                {
                    producers.Add(x.Producer);
                }
            });
            return producers;
        }

        public void UpdateProducer(int id, Producer producer)
        {
            if (producer == null)
            {
                throw new ArgumentNullException();
            }

            var producerInDb = _context.Producers.FirstOrDefault(x => x.Id == id);
            if(producerInDb == null)
            {
                throw new Exception("Producer doesn't exist in database.");
            }

            producerInDb.ProducerName = producer.ProducerName;
            _context.SaveChanges();
        }
        public void DeleteProducer(int id)
        {
            var producerInDb = _context.Producers.FirstOrDefault(x => x.Id == id);
            if (producerInDb == null)
            {
                throw new Exception("Producer doesn't exist in database.");
            }
            _context.Producers.Remove(producerInDb);
            _context.SaveChanges();
        }

        private bool ProducerExist(Producer producer)
        {
            return _context.Producers.Any(x => x.ProducerName == producer.ProducerName);
        }        
    }
}
