using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop_Back.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
        public string PhoneNumber { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            this.Id = user.Id;
            this.Firstname = user.Firstname;
            this.Lastname = user.Lastname;
            this.Email = user.Email;
            this.Role = user.Role;
            this.PhoneNumber = user.PhoneNumber;
            this.Token = token;
        }
    }
}
