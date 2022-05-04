using _6cGenerics___WiredBrainCoffeeStorageApp.Data;
using _6cGenerics___WiredBrainCoffeeStorageApp.Entities;
using _6cGenerics___WiredBrainCoffeeStorageApp.Repositories;
using System;

namespace _6cGenerics___WiredBrainCoffeeStorageApp
{
    class Program
    {
        static void Main(string[] argc)
        {
            Action<Employee> itemAdded = new Action<Employee>(EmployeeAdded);

            // can also do this - shorter
            //ItemAdded<Employee> itemAdded = EmployeeAdded;

            // or we can even skip the ItemAdded<Employee> itemADded = new ItemAdded<Employee>(EmployeeAdded) line altogether and just do:
            //var employeeRepo = new SqlRepository<Employee>(new StorageAppDbContext(), EmployeeAdded);
            // instead of calling the constructor below with itemAdded, we call it with EmployeeAdded

            // The constructor of SqlRepository takes a dbContext instance, so we create a new instance of our StorageAppDbContext class
            var employeeRepo = new SqlRepository<Employee>(new StorageAppDbContext(), itemAdded);

            // Or we can do the same as we do with delegates, but with event handlers
            var employeeRepo2 = new SqlRepository2<Employee>(new StorageAppDbContext());
            employeeRepo2.ItemAdded += EmployeeRepo2_ItemAdded;

            // can now do this since the delegate type is contravariant
            // ItemAdded<Manager> managerAdded = itemAdded;

            AddEmployees(employeeRepo);
            AddManagers(employeeRepo);
            GetEmployeeById(employeeRepo, 1);
            WriteAllToConsole(employeeRepo);

            Console.WriteLine();

            var organizationRepository = new ListRepository<Organization>();
            AddOrganizations(organizationRepository);
            WriteAllToConsole(organizationRepository);
        }

        // event handler
        private static void EmployeeRepo2_ItemAdded(object? sender, Employee e)
        {
            Console.WriteLine($"Employee added => {e.FirstName}");
        }

        // delegate
        private static void EmployeeAdded(Employee employee)
        {
            Console.WriteLine($"Employee added => {employee.FirstName}");
        }

        private static void AddManagers(IWriteRepository<Manager> managerRepository)
        {
            Manager sarahManager = new Manager { FirstName = "Sara" };
            var sarahManagerCopy = sarahManager.Copy<Manager>();

            if (sarahManagerCopy is not null)
            {
                sarahManagerCopy.FirstName += "_Copy";
                managerRepository.Add(sarahManagerCopy);
            }

            managerRepository.Add(sarahManager);
            managerRepository.Add(new Manager { FirstName = "Henry" });
            managerRepository.Save();
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
            var employees = new[]
            {
                new Employee { FirstName = "Julia" },
                new Employee { FirstName = "Sarah" },
                new Employee { FirstName = "Anca" }
            };
            RepositoryExtensions.AddBatch(employeeRepository, employees);
            // Since we made the AddBatch method an extension for IRepository<T> instances, we can use it on all IRepository<T> instances
            //employeeRepository.AddBatch(employees);

            //AddBatch(employeeRepository, employees);
            // the same as
            // AddBatch<Employee>(employeeRepository, employees);
            // we don't need to specify AddBatch of Employee because of the arguments with which we call the method
        }

        private static void AddOrganizations(IRepository<Organization> organizationRepository)
        {
            var organizations = new[]
            {
                new Organization {Name = "Pluralsight"},
                new Organization {Name = "Udemy"},
                new Organization {Name = "Coursera"}
            };
            RepositoryExtensions.AddBatch(organizationRepository, organizations);
            // Since we made the AddBatch method an extension for IRepository<T> instances, we can use it on all IRepository<T> instances
            //organizationRepository.AddBatch(organizations);

            //AddBatch(organizationRepository, organizations);
        }

        // generic method to add both organizations and employees
        // we can also use IWriteRepository interface because it doesn't have a type constraint and so we don't need to specify where T implements IEntity
        //private static void AddBatch<T>(IWriteRepository<T> repository, T[] items) { }
        //private static void AddBatch<T>(IRepository<T> repository, T[] items) where T : IEntity
        //{
        //    foreach (var organization in items)
        //    {
        //        repository.Add(organization);
        //    }
        //    repository.Save();
        //}

        // Non generic method to add organizations
        //private static void AddBatch(IRepository<Organization> organizationRepository, Organization[] organizations)
        //{
        //    foreach (var organization in organizations)
        //    {
        //        organizationRepository.Add(organization);
        //    }
        //    organizationRepository.Save();
        //}

        private static void GetEmployeeById(IRepository<Employee> employeeList, int id)
        {
            var employee = employeeList.GetById(id);
            Console.WriteLine($"Employee with id {id} is {employee.FirstName}");
        }
    }
}
