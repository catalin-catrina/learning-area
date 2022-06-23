using _6bGenerics___WiredBrainCoffeeStorageApp.Entities;
using Microsoft.EntityFrameworkCore;

namespace _6bGenerics___WiredBrainCoffeeStorageApp.Repositories
{
    public class SqlRepository<T> : IRepository<T> where T : class, IEntity
    {
        // Here we don't store the items in a list of T, but in an in-memory database with EntityFrameworkCore
        // This means we have to setup an EntityFramework db context - which is a class in the Data/StorageAppDbContext file
        // IEntity must implement a reference type (class), in order to be able to use EntityFrameworkCore

        // fields
        private DbContext _dbContext;
        private DbSet<T> _dbSet;

        // constructor
        public SqlRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T GetById(int id)
        {
            return _dbSet.Find(id);
        }

        public void Add(T item)
        {
            _dbSet.Add(item);
        }

        public void Remove(T item)
        {
            _dbSet.Remove(item);
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
