using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop_Back.ValidationAttributes
{
    public class QuantityValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return int.Parse(value.ToString()) > 0;
        }
    }
}
