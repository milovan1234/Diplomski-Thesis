using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.Models;
using WebShop_Back.ValidationAttributes;

namespace WebShop_Back
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [FirstLastNameValidation(ErrorMessage = "First name is invalid.")]
        public string Firstname { get; set; }

        [Required]
        [FirstLastNameValidation(ErrorMessage = "Last name is invalid.")]
        public string Lastname { get; set; }

        [Required]
        [EmailValidation(ErrorMessage = "Email is invalid.")]
        public string Email { get; set; }

        [Required]
        [PasswordValidation(ErrorMessage = "Password is invalid.")]
        public string Password { get; set; }

        public UserRole Role { get; set; }
        public int RoleId { get; set; }

        [Required]
        [PhoneNumberValidation(ErrorMessage = "Phone number is invalid.")]
        public string PhoneNumber { get; set; }
    }
}
