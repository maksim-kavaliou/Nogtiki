using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Salon.Server.DbModels;
using Salon.Server.Repositories.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Salon.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorsController : ControllerBase
    {

        private readonly IAdministratorsRepository _administratorsRepository;
        private readonly ILogger<WeatherForecastController> _logger;

        public AdministratorsController(IAdministratorsRepository administratorsRepository, ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            _administratorsRepository = administratorsRepository;
        }

        // GET: api/<AdministratorsController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var administrators = await _administratorsRepository.GetAll();

            _logger.LogInformation($"got {administrators.Count()} admins");

            return  Ok(administrators.ToArray());
        }

        // GET api/<AdministratorsController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var administrator = await _administratorsRepository.GetbyId(id);

            return new JsonResult(administrator);
        }

        // POST api/<AdministratorsController>
        [HttpPost]
        public async Task<JsonResult> Post([FromBody] Administrator administrator)
        {
            try
            {
                var id = await _administratorsRepository.Create(administrator);
                return new JsonResult(new { id });
            }
            catch (Exception ex)
            {
                _logger.LogError("Exception during admin creation {Exception}", ex);
                return new JsonResult(new { error = $"failure. {ex.Message}"});
            } 
        }

        // PUT api/<AdministratorsController>/5
        [HttpPut("{id}")]
        public async Task<JsonResult> Put(int id, [FromBody] Administrator administrator)
        {
            await _administratorsRepository.Update(id, administrator);

            return new JsonResult(new { success = true });
        }

        // DELETE api/<AdministratorsController>/5
        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            await _administratorsRepository.Delete(id);
            return new JsonResult(new { success = true });
        }
    }
}
