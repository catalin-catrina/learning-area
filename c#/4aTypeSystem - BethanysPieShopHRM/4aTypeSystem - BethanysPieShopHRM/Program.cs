using System;
using BethanysPieShopHRM.HR;
using BethanysPieShopHRM.Accounting;

namespace BethanysPieShopHRM
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create a new object by instantiating the Employee class through the Employee constructor
            Employee catalin = new Employee("Catalin", "Catrina", "catalincatrina@yahoo.com", new DateTime(1994, 9, 29), EmployeeType.Manager, 30);
            Employee andrei = new Employee("Andrei", "Xulescu", "andrei@google.com", new DateTime(1999, 4, 23), EmployeeType.StoreManager, 32);

            // We call the static method inside the Employee class using the class, because it's static
            Employee.DisplayTaxRate();

            // Call methods on the object
            catalin.PerformWork();
            catalin.ReceiveWage();
            catalin.DisplayEmployeeDetails();

            andrei.PerformWork();
            andrei.ReceiveWage();
            andrei.DisplayEmployeeDetails();

            // Null - an object that's not initialized doesn't reference anything on the heap, it just points to an empty variable on the stack - null
            // Employee adrian = null;
            // adrian.PerformWork();
            // The same thing as this - automatically assigned to null
            // Employee adrian;

            // Set the FirstName to a new value
            // catalin.FirstName = "Cata";

            // Namespaces
            // If we don't include the namespace in the file, we have to specify it before the name of the class - less readable
            // BethanysPieShopHRM.Accounting.Customer customer = new Accounting.Customer();

            // Customer customer2 = new Customer();
        }
    }
}