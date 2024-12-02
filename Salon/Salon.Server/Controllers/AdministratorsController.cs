using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using Salon.Server.DbModels;
using Salon.Server.Mappers;
using Salon.Server.Repositories.Interfaces;
using Salon.Server.ViewModels;
using System.ComponentModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Salon.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorsController : ControllerBase
    {

        private readonly IAdministratorsRepository _administratorsRepository;
        private readonly AdministratorModelMapper _administratorMapper;
        
        private readonly ILogger<WeatherForecastController> _logger;

        public AdministratorsController(IAdministratorsRepository administratorsRepository, AdministratorModelMapper administratorMapper, ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            _administratorsRepository = administratorsRepository;
            _administratorMapper = administratorMapper;
        }

        // GET: api/<AdministratorsController>?filter=sdfsd
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? filter = null)
        {
            var administrators = filter.IsNullOrEmpty() ?
                await _administratorsRepository.GetAll() :
                await _administratorsRepository.GetWithFilter(filter);

            var viewAdministrators = administrators.Select(_administratorMapper.MapDbToViewModel).ToList();

            return Ok(administrators.ToArray());
        }


        // GET api/<AdministratorsController>/5
        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var administrator = await _administratorsRepository.GetbyId(id);

            return new JsonResult(_administratorMapper.MapDbToViewModel(administrator));
        }

        // POST api/<AdministratorsController>
        [HttpPost]
        public async Task<JsonResult> Post([FromBody] AdministratorViewModel administrator)
        {
            try
            {
                var dbModel = _administratorMapper.MapViewModelToDb(administrator);
                var id = await _administratorsRepository.Create(dbModel);
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
        public async Task<JsonResult> Put(int id, [FromBody] AdministratorViewModel administrator)
        {
            var dbModel = _administratorMapper.MapViewModelToDb(administrator);
            await _administratorsRepository.Update(id, dbModel);

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
