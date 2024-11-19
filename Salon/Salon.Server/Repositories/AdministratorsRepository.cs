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

        public async Task<int> Create(Administrator administrator)
        {
            var query = 
                "INSERT INTO [dbo].[Administrators] (Name, Email, Phone,Password) VALUES (@Name, @Email, @Phone, @Password)" +
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

        public async Task Delete(int id)
        {
            var query = "DELETE FROM Administrators WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }

        public async Task<IEnumerable<Administrator>> GetAll()
        {
            var query = "SELECT [Id], [Name], [Email], [Phone], [Password] FROM Administrators";

            using (var connection = _context.CreateConnection())
            {
                var albums = await connection.QueryAsync<Administrator>(query);

                return albums.ToList();
            }
        }

        public async Task<Administrator> GetbyId(int id)
        {
            var query = "SELECT [Id], [Name], [Email], [Phone], [Password] FROM Administrators WHERE Id = @Id";

            using (var connection = _context.CreateConnection())
            {
                var albums = await connection.QuerySingleOrDefaultAsync<Administrator>(query, new { id });

                return albums;
            }
        }

        public async Task Update(int id, Administrator administrator)
        {
            var query = @"
                UPDATE Administrators 
                SET [Name] = @Name, 
                    [Email] = @Email, 
                    [Phone] = @Phone
                WHERE Id = @Id";

            var parameters = new DynamicParameters();
            parameters.Add("Id", id, DbType.Int32);
            parameters.Add("Name", administrator.Name, DbType.String);
            parameters.Add("Email", administrator.Email, DbType.String);
            parameters.Add("Phone", administrator.Phone, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

    }
}
