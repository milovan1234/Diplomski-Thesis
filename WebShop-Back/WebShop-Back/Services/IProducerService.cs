using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public interface IProducerService
    {
        IEnumerable<Producer> GetProducers();
        IEnumerable<Producer> GetProducersForSubCategory(int subCategoryId);
        void CreateProducer(Producer producer);
        void UpdateProducer(int id, Producer producer);
        void DeleteProducer(int id);
    }
}
