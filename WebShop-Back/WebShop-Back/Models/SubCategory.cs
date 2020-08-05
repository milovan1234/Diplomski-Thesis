using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.ValidationAttributes;

namespace WebShop_Back.Models
{
    public class SubCategory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [CategoryNameValidation]
        public string SubCategoryName { get; set; }

        public Category Category { get; set; }
        public int CategoryId { get; set; }
    }
}
