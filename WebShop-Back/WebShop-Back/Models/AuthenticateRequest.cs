using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.ValidationAttributes;

namespace WebShop_Back.Models
{
    public class AuthenticateRequest
    {
        [Required]
        [EmailValidation]
        public string Email { get; set; }

        [Required]
        [PasswordValidation]
        public string Password { get; set; }
    }
}
