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
    public class ProducersController : ControllerBase
    {
        private readonly IProducerService _producerService;
        public ProducersController(IProducerService producerService)
        {
            this._producerService = producerService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAllProducers()
        {
            return Ok(_producerService.GetProducers());
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult AddProducer([FromBody] Producer producer)
        {
            try
            {
                _producerService.CreateProducer(producer);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{producerId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateProducer([FromRoute] int producerId,[FromBody] Producer producer)
        {
            try
            {
                _producerService.UpdateProducer(producerId, producer);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{producerId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteProducer([FromRoute] int producerId)
        {
            try
            {
                _producerService.DeleteProducer(producerId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
