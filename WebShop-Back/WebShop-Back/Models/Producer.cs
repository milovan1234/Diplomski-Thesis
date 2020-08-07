using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.ValidationAttributes;

namespace WebShop_Back.Models
{
    public class Producer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ProducerNameValidation(ErrorMessage = "Producer name is invalid.")]
        public string ProducerName { get; set; }
    }
}
