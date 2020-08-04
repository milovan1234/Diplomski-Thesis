using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WebShop_Back.ValidationAttributes
{
    public class PhoneNumberValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return new Regex(@"^\+(381)\s(6)\d{1}\s\d{3}\-\d{3,5}$").IsMatch(value.ToString());
        }
    }
}
