using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
        public DateTime DateTimeIssue { get; set; }

        [Required]
        public double TotalPrice { get; set; }

        [Required]
        public double TotalPriceDiscount { get; set; }
    }
}
