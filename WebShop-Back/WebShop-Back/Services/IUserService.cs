using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop_Back.Models;

namespace WebShop_Back.Services
{
    public interface IUserService
    {        
        void CreateUser(User user);
        IEnumerable<User> GetUsers();
        IEnumerable<UserRole> GetUserRoles();
        User GetUser(int id);
        void UpdateUser(int id, User user);
        void DeleteUser(int id);
        AuthenticateResponse Authenticate(AuthenticateRequest model);
    }
}
