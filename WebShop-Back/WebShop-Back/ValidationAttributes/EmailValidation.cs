using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace WebShop_Back.ValidationAttributes
{
    public class EmailValidation : ValidationAttribute  
    {
        public override bool IsValid(object value)
        {
            try
            {
                MailAddress mailValidator = new MailAddress(value.ToString());
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
