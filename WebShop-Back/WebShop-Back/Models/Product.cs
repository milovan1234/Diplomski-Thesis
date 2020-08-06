using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.ValidationAttributes;

namespace WebShop_Back.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public Producer Producer { get; set; }
        [Required]
        public int ProducerId { get; set; }

        public SubCategory SubCategory { get; set; }
        [Required]
        public int SubCategoryId { get; set; }

        [Required]
        public double Price { get; set; }

        [DiscountValidation]
        public int Discount { get; set; }

        [Required]
        public int Stock { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Column("Active")]
        public bool IsActive { get; set; }

        [NotMapped]
        [Required]
        [System.Text.Json.Serialization.JsonIgnore]
        public IFormFile Image { get; set; }

        public string ImagePath { get; set; }
    }
}
