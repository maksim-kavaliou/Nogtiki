using Salon.Server.DbModels;
using Salon.Server.ViewModels;

namespace Salon.Server.Mappers
{
    public class AdministratorModelMapper
    {
        public AdministratorViewModel MapDbToViewModel(Administrator model) 
        {
            return new AdministratorViewModel { 
                Id = model.Id,
                Name = model.Name,
                 Email = model.Email,
                Phone = model.Phone
            };
        }

        public Administrator MapViewModelToDb(AdministratorViewModel model)
        {
            return new Administrator
            {
                Id = model.Id,
                Name = model.Name,
                Email = model.Email,
                Phone = model.Phone,
                Password = String.Empty
            };
        }
    }
}
