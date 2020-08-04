using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShop_Back.Models;
using WebShop_Back.Services;

namespace WebShop_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult GetUsers()
        {
            var userId = this.User.Claims.ToArray()[0].Value;
            return Ok(_userService.GetUsers().Where(x => x.Id != int.Parse(userId)));
        }

        [HttpGet("{userId}")]
        [Authorize(Roles = "Admin, User")]
        public IActionResult GetUser(int userId)
        {
            var authId = int.Parse(this.User.Claims.ToArray()[0].Value);
            var authRole = this.User.Claims.ToArray()[1].Value;
            if(authId != userId && authRole == "User")
            {
                return Unauthorized();
            }

            var user = _userService.GetUser(userId);
            if (user == null)
            {
                return BadRequest();
            }
            return Ok(user);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] User user)
        {
            try
            {
                user.RoleId = _userService.GetUserRoles()
                                          .FirstOrDefault(x => x.RoleName == "User").RoleId;
                _userService.CreateUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost()]
        [Authorize(Roles = "Admin")]
        public IActionResult AddUser([FromBody] User user)
        {
            try
            {
                _userService.CreateUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{userId}")]
        [Authorize(Roles = "Admin,User")]
        public IActionResult UpdateUser([FromRoute] int userId,[FromBody] User user)
        {
            var authId = int.Parse(this.User.Claims.ToArray()[0].Value);
            var authRole = this.User.Claims.ToArray()[1].Value;
            if (authId != userId && authRole == "User")
            {
                return Unauthorized();
            }

            if(authRole == "User")
            {
                user.RoleId = _userService.GetUserRoles()
                                          .FirstOrDefault(x => x.RoleName == authRole).RoleId;
            }

            try
            {
                _userService.UpdateUser(userId, user);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }            
        }
        [HttpDelete("{userId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteUser([FromRoute] int userId)
        {
            var authId = int.Parse(this.User.Claims.ToArray()[0].Value);
            if (authId == userId)
            {
                return BadRequest();
            }

            try
            {
                _userService.DeleteUser(userId);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("authenticate")]
        [AllowAnonymous]
        public IActionResult Authencticate([FromBody] AuthenticateRequest model)
        {
            var user = _userService.Authenticate(model);
            if (user == null)
            {
                return BadRequest();
            }
            return Ok(user);
        }
    }
}
