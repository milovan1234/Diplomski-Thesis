using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.ValidationAttributes;

namespace WebShop_Back.Models
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        public Order Order { get; set; }
        [Required]
        public int OrderId { get; set; }

        public Product Product { get; set; }
        [Required]
        public int ProductId { get; set; }       

        [Required]
        [QuantityValidation(ErrorMessage = "Quantity value is invalid.")]
        public int Quantity { get; set; }
    }
}
