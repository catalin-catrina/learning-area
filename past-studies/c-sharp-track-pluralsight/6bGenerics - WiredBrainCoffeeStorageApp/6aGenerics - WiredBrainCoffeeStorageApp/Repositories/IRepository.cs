using _6bGenerics___WiredBrainCoffeeStorageApp.Entities;
using System.Collections;

namespace _6bGenerics___WiredBrainCoffeeStorageApp.Repositories
{
    // declare type parameter is contravariant
    // works if T is used only for input parameters
    // use a more specific generic type argument on the generic interface
    public interface IWriteRepository<in T>
    {
        void Add(T item);
        void Remove(T item);
        void Save();
    }

    // adding the "out" keyword to the type parameter makes the type parameter covariant, which means that a less specific type can be used
    // this works if the type parameter is not used as a return value in the generic interface
    // the type can be less specific on the interface
    // works if T is used only for for return values
    // use a less specific type argument on the generic interface
    public interface IReadRepository<out T>
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
    }

    public interface IRepository<T> : IReadRepository<T>, IWriteRepository<T> where T : IEntity { }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Examples below:
    // Generic interface inheriting from generic interface
    public interface ISuperRepository<T, TKey> : IRepository<T> where T : IEntity { }

    // Non-generic interface inheriting from generic interface
    public interface ISuperMegaRepository : IRepository<Employee> { }
    public interface ISuperBigRepository : IRepository<Organization> { }

    // Generic interface inheriting from non-generic interface: example - the built-in interface IEnumerable
    //public interface IEnumerable<out T> : IEnumerable { }

    // The same concepts also apply to classes
    // implementing an interface to a non-generic class
    public class EmployeeRepo : IRepository<Employee>
    {
        public void Add(Employee item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetAll()
        {
            throw new NotImplementedException();
        }

        public Employee GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Remove(Employee item)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }
    }

    // generic class implementing generic interface
    public class GenericRepo<T> : IRepository<T> where T : IEntity
    {
        public void Add(T item)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> GetAll()
        {
            throw new NotImplementedException();
        }

        public T GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Remove(T item)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }
    }
}