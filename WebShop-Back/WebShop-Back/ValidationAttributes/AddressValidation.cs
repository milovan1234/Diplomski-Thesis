using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WebShop_Back.ValidationAttributes
{
    public class AddressValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return new Regex(@"^[a-zčćšđžA-ZČĆŠĐŽ]+(?:[\s-][a-zčćšđžA-ZČĆŠĐŽ]+)*$").IsMatch(value.ToString());
        }
    }
}
