using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.ValidationAttributes;

namespace WebShop_Back.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public User User { get; set; }
        [Required]
        public int UserId { get; set; }

        [Required]
        [AddressValidation(ErrorMessage = "City name is invalid.")]
        public string City { get; set; }

        [Required]
        [AddressValidation(ErrorMessage = "Street name is invalid.")]
        public string Street { get; set; }

        [Required]
        [HouseNumberValidation(ErrorMessage = "House number is invalid.")]
        public string HouseNumber { get; set; }

        public DateTime DateTimeIssue { get; set; }

        [Required]
        [PriceValidation(ErrorMessage = "Total price value is invalid.")]
        public double TotalPrice { get; set; }

        [Required]
        [PriceValidation(ErrorMessage = "Total price with discount value is invalid.")]
        public double TotalPriceDiscount { get; set; }

        public List<OrderItem> OrderItems { get; set; }
    }
}
