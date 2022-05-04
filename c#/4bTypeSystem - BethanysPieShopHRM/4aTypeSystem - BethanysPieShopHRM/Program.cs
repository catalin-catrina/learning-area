using System;
using BethanysPieShopHRM.HR;

namespace BethanysPieShopHRM
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create a new object by instantiating the Employee class through the Employee constructor

            // Cannot instantiate abstract classes
            Employee catalin = new Employee(5, "Catalin", "Catrina", "catalincatrina@yahoo.com", new DateTime(1994, 9, 29), 30);
            Employee andrei = new Employee(0, "Andrei", "Xulescu", "andrei@google.com", new DateTime(1999, 4, 23), 32);

            Manager andreea = new Manager(1, "Andreea", "Jones", "andrea@yahoo.com", new DateTime(1995, 12, 13), 29);
            andreea.DisplayEmployeeDetails();
            andreea.AttendManagementMeeting();

            JuniorResearcher ginny = new JuniorResearcher(2, "Ginny", "Weasly", "ginny@google.com", new DateTime(2003, 5, 6), 33);
            ginny.ResearchPieTastes(5);
            Console.WriteLine(ginny.NumberOfHoursWorked); // 5
            ginny.ReceiveWage();

            //catalin.GiveBonus(); // bonus 100
            andreea.GiveBonus(); // bonus 500
            ginny.GiveBonus(); // bonus 100

            Console.WriteLine();

            // We can use a base reference / a variable of the base type (Employee) to point to the instance of a derived type
            // The GiveBonus() method we will call will depend on the type object, even though we are calling it through a base reference of Employee
            // Employee[] employees = new Employee[2];
            // employees[0] = catalin;
            // employees[0] = andreea;
            // employees[1] = ginny;

            // foreach(var employee in employees)
            // {
            //    employee.GiveBonus();
            // }

            // Every type inherits from System.Object so we can use methods declared on System.Object
            string ginnyString = ginny.ToString();

            // We can point o1, of type object, to hold a reference to a Manager
            // Since o1 is a reference of type object, we can only use the members defined on the base type: object
            // So we can't use members of the Manager class on it
            object o1 = new Manager(4, "Bethany", "Smith", "bethany@yahoo.com", new DateTime(1999, 5, 30), 25);

            // Interfaces
            // On our Employee type, we have implemented the IComparable and implemented our own comparison logic. We signed a contract that our contract knows how to be sorted
            // Calling the sort() method on the objects instantiated with the Employee class will invoke the CompareTo method to sort our list
            List<Employee> employees = new List<Employee>();
            employees.Add(ginny);
            employees.Add(andreea);

            employees.Sort();

            foreach(var employee in employees)
            {
                employee.DisplayEmployeeDetails();
            }

            // Interfaces also allow polymorphism
            // Again, we can only use members defined on the type of the variable we defined, in this case IEmployee, so we can't use mircea.AttendManagementMeeting()
            // AttendManagementMeeting() is added on the Manager type, and it's not available on the IEmployee type
            IEmployee mircea = new Manager(4, "mircea", "mircica", "mircea@yahoo.com", new DateTime(1989, 12, 4), 3);
            mircea.DisplayEmployeeDetails();
            // mircea.AttendManagementMeeting();
        }
    }
}