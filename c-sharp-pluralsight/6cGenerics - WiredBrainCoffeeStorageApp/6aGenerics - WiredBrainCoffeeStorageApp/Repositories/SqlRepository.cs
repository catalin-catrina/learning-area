using _6cGenerics___WiredBrainCoffeeStorageApp.Entities;
using Microsoft.EntityFrameworkCore;

namespace _6cGenerics___WiredBrainCoffeeStorageApp.Repositories
{
    // a delegate is like a method pointer. this delegate can point to a method that returns void and that has an object parameter
    // public delegate void ItemAdded(object item);

    // contravariant generic delegate
    // contravariant types can only be used if it's not used as a return type (here return type is void so its fine)
    // public delegate void ItemAdded<in T>(T item);
    // this delegate is the same as an already existing delegate in .NET System namespace, called Action, so we'll just use that one below

    // variant types can only be used if its not used as a parameter type
    // public delegate T ItemAdded<out T>();
    public class SqlRepository<T> : IRepository<T> where T : class, IEntity
    {
        // Here we don't store the items in a list of T, but in an in-memory database with EntityFrameworkCore
        // This means we have to setup an EntityFramework db context - which is a class in the Data/StorageAppDbContext file
        // IEntity must implement a reference type (class), in order to be able to use EntityFrameworkCore

        // fields
        private DbContext _dbContext;

        //private ItemAdded<T>? _itemAddedCallback;
        private Action<T>? _itemAddedCallback;

        private DbSet<T> _dbSet;

        // constructor
        public SqlRepository(DbContext dbContext, Action<T>? itemAddedCallback = null)
        {
            _dbContext = dbContext;
            _itemAddedCallback = itemAddedCallback;
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
            // this means the delegate here will invoke the method to which it points
            _itemAddedCallback?.Invoke(item);
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

    public class SqlRepository2<T> : IRepository<T> where T : class, IEntity
    {
        private DbContext _dbContext;

        private DbSet<T> _dbSet;

        // constructor
        public SqlRepository2(DbContext dbContext, Action<T>? ItemAdded = null)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public event EventHandler<T>? ItemAdded;

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
            // this means the delegate here will invoke the method to which it points
            ItemAdded?.Invoke(this, item);
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
