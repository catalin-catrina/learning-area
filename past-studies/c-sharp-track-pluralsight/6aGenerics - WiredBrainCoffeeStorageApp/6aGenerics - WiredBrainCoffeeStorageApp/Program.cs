using _6aGenerics___WiredBrainCoffeeStorageApp.Entities;
using _6aGenerics___WiredBrainCoffeeStorageApp.Repositories;
using System;

namespace _6aGenerics___WiredBrainCoffeeStorageApp
{
    class Program
    {
        static void Main(string[] argc)
        {
            var employeeRepository = new GenericRepository<Employee>();
            AddEmployees(employeeRepository);
            Console.WriteLine();
            var organizationRepository = new GenericRepository<Organization>();
            AddOrganizations(organizationRepository);
            Console.WriteLine();
            AddMircea();
            Console.WriteLine();
            GetEmployeeById(employeeRepository, 1);
        }

        private static void AddMircea()
        {
            var employeeRepository = new GenericRepository<Employee>();
            var mircea = new Employee { FirstName = "Mircea" };
            employeeRepository.Add(mircea);
            employeeRepository.Save();
            employeeRepository.Remove(mircea);
        }

        private static void AddEmployees(GenericRepository<Employee> employeeRepository)
        {
            employeeRepository.Add(new Employee { FirstName = "Julia" });
            employeeRepository.Add(new Employee { FirstName = "Anna" });
            employeeRepository.Add(new Employee { FirstName = "Thomas" });
            employeeRepository.Save();
        }

        private static void AddOrganizations(GenericRepository<Organization> organizationRepository)
        {
            organizationRepository.Add(new Organization { Name = "Pluralsight" });
            organizationRepository.Add(new Organization { Name = "Udemy" });
            organizationRepository.Add(new Organization { Name = "Coursera" });
            organizationRepository.Save();
        }

        private static void GetEmployeeById(GenericRepository<Employee> employeeList, int id)
        {
            var employee = employeeList.GetById(id);
            Console.WriteLine($"Employee with id {id} is {employee.FirstName}");
        }
    }
}
