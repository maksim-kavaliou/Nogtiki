using Salon.Server.DbModels;

namespace Salon.Server.Repositories.Interfaces
{
    public interface IAdministratorsRepository
    {
        Task<int> Create(Administrator administrator);
        Task Delete(int id);
        Task<IEnumerable<Administrator>> GetAll();
        Task<Administrator> GetbyId(int id);
        Task<IEnumerable<Administrator>> GetWithFilter(string filter);
        Task Update(int id, Administrator administrator);
    }
}
