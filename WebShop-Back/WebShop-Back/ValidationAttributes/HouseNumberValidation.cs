using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WebShop_Back.ValidationAttributes
{
    public class HouseNumberValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return new Regex(@"^[0-9a-zA-Z]+(?:[/][0-9a-zA-Z]+)*$").IsMatch(value.ToString());
        }
    }
}
