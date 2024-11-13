using Dapper;
using Salon.Server.Context;
using Salon.Server.DbModels;
using Salon.Server.Repositories.Interfaces;
using System.Data;

namespace Salon.Server.Repositories
{
    public class AdministratorsRepository : IAdministratorsRepository
    {
        private DapperContext _context;
        public AdministratorsRepository(DapperContext context) => _context = context;

        public async Task<int> CreateAlbums(Administrator administrator)
        {
            var query = 
                "INSERT INTO Administrators (Name, Email, Phone,Password) VALUES (@Name, @Email, @Phone, @Password)" +
                "SELECT CAST(SCOPE_IDENTITY() AS int)";

            var parameters = new DynamicParameters();
            parameters.Add("Name", administrator.Name, DbType.String);
            parameters.Add("Email", administrator.Email, DbType.String);
            parameters.Add("Phone", administrator.Phone, DbType.String);
            parameters.Add("Password", administrator.Password, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);

                return id;
            }
        }
    }
}
