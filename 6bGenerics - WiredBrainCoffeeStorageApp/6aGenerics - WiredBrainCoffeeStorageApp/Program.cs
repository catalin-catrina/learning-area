using _6aGenerics___WiredBrainCoffeeStorageApp.Data;
using _6bGenerics___WiredBrainCoffeeStorageApp.Entities;
using _6bGenerics___WiredBrainCoffeeStorageApp.Repositories;
using System;

namespace _6bGenerics___WiredBrainCoffeeStorageApp
{
    class Program
    {
        static void Main(string[] argc)
        {
            // The constructor of SqlRepository takes a dbContext instance, so we create a new instance of our StorageAppDbContext class
            var employeeRepo = new SqlRepository<Employee>(new StorageAppDbContext());
            AddEmployees(employeeRepo);
            AddManagers(employeeRepo);
            GetEmployeeById(employeeRepo, 1);
            WriteAllToConsole(employeeRepo);

            Console.WriteLine();

            var organizationRepository = new ListRepository<Organization>();
            AddOrganizations(organizationRepository);
            WriteAllToConsole(organizationRepository);

            // Generic type parameters are by default invariant - they have to have the exactly the same type as the type that you use on the class that implements the interface
            // That means we have on the interface (left) exactly the same type argument as on the class (right) - <Organization>
            // Example: 
            // IRepository<Organization> repo = new ListRepository<Organization>();

            // The generic type parameter of this generic IRepository interface is by default invariant, this means we can't use a less specific generic type argument 
            // like IEntity
            //IRepository<IEntity> repo2 = new ListRepository<Organization>(); // this won't work

            // We created another interface IReadRepository, and we added to it's data type parameter the out keyword, making it covariant, this means we can now
            // use the IEntity type parameter on the IReadRepository interface. Now we can also use other type parameters like Object
            //IReadRepository<IEntity> repo3 = new ListRepository<Organization>();
            //IReadRepository<Object> repo4 = new ListRepository<Organization>();

            // Manager is a more specific type than employee, so we need to define the generic type parameter on the IRepository interface as contravariant
            //IRepository<Manager> repo = new SqlRepository<Employee>(new StorageAppDbContext());
            //IWriteRepository<Manager> repo = new SqlRepository<Employee>(new StorageAppDbContext());
            //repo.Add(new Manager());
        }

        //private static void AddManagers(IRepository<Employee> employeeRepository) { }
        private static void AddManagers(IWriteRepository<Manager> managerRepository)
        {
            managerRepository.Add(new Manager { FirstName = "Sarah" });
            managerRepository.Add(new Manager { FirstName = "Henry" });
            managerRepository.Save();

            // Here we can also add Employees
            //employeeRepository.Add(new Employee { FirstName = "Xulescu" });
            // If we wanted to prevent this, we could change the generic type argument of IRepository from <Employee> to <Manager>
        }

        private static void WriteAllToConsole(IReadRepository<IEntity> repository)
        {
            var items = repository.GetAll();
            foreach (var item in items)
            {
                Console.WriteLine(item);
            }
        }

        private static void AddEmployees(IRepository<Employee> employeeRepository)
        {
            employeeRepository.Add(new Employee { FirstName = "Julia" });
            employeeRepository.Add(new Employee { FirstName = "Anna" });
            employeeRepository.Add(new Employee { FirstName = "Thomas" });
            employeeRepository.Save();
        }

        private static void AddOrganizations(IRepository<Organization> organizationRepository)
        {
            organizationRepository.Add(new Organization { Name = "Pluralsight" });
            organizationRepository.Add(new Organization { Name = "Udemy" });
            organizationRepository.Add(new Organization { Name = "Coursera" });
            organizationRepository.Save();
        }

        private static void GetEmployeeById(IRepository<Employee> employeeList, int id)
        {
            var employee = employeeList.GetById(id);
            Console.WriteLine($"Employee with id {id} is {employee.FirstName}");
        }
    }
}
