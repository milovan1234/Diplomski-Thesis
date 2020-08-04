using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebShop_Back.DbContexts;
using WebShop_Back.Helpers;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly WebShopContext _context;
        public UserService(WebShopContext context,IOptions<AppSettings> _appSettings)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            this._appSettings = _appSettings.Value;
        }
        public void CreateUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException();
            }

            if (UserExist(user))
            {
                throw new Exception("User already exist in database.");
            }

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public IEnumerable<UserRole> GetUserRoles()
        {
            return _context.UserRoles;
        }

        public IEnumerable<User> GetUsers()
        {
            return _context.Users.Include(x => x.Role);
        }

        public User GetUser(int id)
        {
            return _context.Users.Include(x => x.Role).FirstOrDefault(x => x.Id == id);
        }        

        public void UpdateUser(int id, User user)
        {
            if(user == null)
            {
                throw new ArgumentNullException();
            }

            var userInDb = _context.Users.Include(x => x.Role).FirstOrDefault(x => x.Id == id);
            if(userInDb == null)
            {
                throw new Exception("User doesn't exist in database.");
            }
            userInDb.Firstname = user.Firstname;
            userInDb.Lastname = user.Lastname;
            userInDb.Password = user.Password;
            userInDb.RoleId = user.RoleId == 0 ? userInDb.RoleId : user.RoleId;
            userInDb.PhoneNumber = user.PhoneNumber;
            _context.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if(user == null)
            {
                throw new Exception("User doesn't exist in database.");
            }
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.Include(x => x.Role).FirstOrDefault(x => x.Email == model.Email && x.Password == model.Password);
            if (user == null)
            {
                return null;
            }
            var token = generateJwtToken(user);
            return new AuthenticateResponse(user, token);
        }        

        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.RoleName),
                }),
                Expires = DateTime.UtcNow.AddSeconds(180),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                        SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool UserExist(User user)
        {
            return _context.Users.Any(x => x.Email == user.Email);
        }        
    }
}
