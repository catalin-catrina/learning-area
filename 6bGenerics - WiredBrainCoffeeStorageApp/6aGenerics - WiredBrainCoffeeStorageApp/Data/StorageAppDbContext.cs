// This class will be our EntityFrameworkCore db context
// We installed the EntityFrameworkCore package by right-clicking on Dependencies => Manage NuGet Packages, and searched for it there
// Also had to install the EntityFrameworkCore.InMemory package to use the UseInMemoryDatabase method

using _6bGenerics___WiredBrainCoffeeStorageApp.Entities;
using Microsoft.EntityFrameworkCore;

namespace _6aGenerics___WiredBrainCoffeeStorageApp.Data
{
    public class StorageAppDbContext : DbContext
    {
        // Instead of using ? to declare Employees as nullable, we use an expression body
        // There, we use the generic Set method that is defined in the DbContext base class, which will return a DbSet<TEntity>
        // Set() will return a DbSet of Employee, exactly like we need it for this property
        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<Organization> Organizations => Set<Organization>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseInMemoryDatabase("StorageAppDb");
        }
    }
}
