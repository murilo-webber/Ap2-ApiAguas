using ApiAguas.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiAguas.Data;

public class ApiDbContext : DbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options)
        : base(options)
    {
    }

    public DbSet<AguaEntity> Aguas => Set<AguaEntity>();
}
