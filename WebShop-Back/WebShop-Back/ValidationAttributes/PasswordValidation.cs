using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WebShop_Back.ValidationAttributes
{
    public class PasswordValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$").IsMatch(value.ToString());
        }
    }
}
