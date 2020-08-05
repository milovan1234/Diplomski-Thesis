using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WebShop_Back.ValidationAttributes
{
    public class ProducerNameValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return new Regex(@"^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$").IsMatch(value.ToString());
        }
    }
}
