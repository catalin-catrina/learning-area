using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.HR
{
    // Public fields, methods and properties are accessible everywhere
    // Protected fields, properties and methods are accessible only to derived types (children classes), but are private to outside
    // Private fields, methods and properties are only accessible within the class.

    // We create child classes by calling the constructor of the child class with the arguments passed into the constructor of the parent class
    //public class Developer : Employee
    //{
    //    public Developer(string first, string last, string mail, DateTime bd, double? rate) : base(first, last, mail, bd, rate) { }
    //}

    // We use the "virtual" keyword on a method in the parent class if we want to allow that method to be overwritten by a child class using the "override" keyword

    // We use the "sealed" keyword on a class to make it not possible to be inherited from.

    // We use the "abstract" keyword on a class to declare it as abstract, meaning it can't be instantiated. Abstract classes contain abstract methods that have
    // no body { }, and their functionality must be implemented by the derived types inheriting from the abstract class, using the "override" keyword

    // System.Object is the base class for everything in C# and .NET

    // We use the "interface" keyword on a class to declare it as an interface, meaning it can't be instantiated. Difference between an interface and an abstract class
    // is that a class can only inherit from one abstract class at a time (or any class), but a class can inherit from multiple interfaces
    // Commonly used interfaces:
    // 1. IComparable - defines a method that is typically used to compare two objects of a certain type to each other, used for example for ordering
    // 2. IEquatable - provides functionality to check equality between two objects
    // 3. ICloneable - provides functionality to clone an object
    // 4. IEnumerable - exists to provide a way to enumerate the items in a list
    // 5. IList - implemented by collection classes that allow accessing elements using an index
    // 6. IDisposable - used to provide a way to dispose of unmanaged interfaces

    // These interfaces exist in .NET and we can implement them on our own types. Certain functionalities like ordering or cloning will rely on us implementing the interface
    // and providing an implementation for the methods or methods defined in the interface

    // On our Employee type, we have implemented the IComparable and implemented our own comparison logic. We signed a contract that our contract knows how to be sorted
    // Calling the sort() method on the objects instantiated with the Employee class will invoke the CompareTo method to sort our list

    // Interfaces also provide polymorphic behavior. Because of the fact that the base type (Employee) implements the IEmployee interface, every manager, developer, etc
    // is also an IEmployee and can be addressed as such

    // public abstract class Employee {}
    public class Employee : IEmployee, IComparable
    {
        // Fields
        private int id;
        private string firstName;
        private string lastName;
        private string email;

        // Making numberOfHoursWorked field accessible to derived types of this class, otherwise only properties are accessible (which is the same thing really)
        protected int numberOfHoursWorked;
        private double wage;
        private double? hourlyRate;

        private DateTime birthDay;

        // Static fields and methods live inside the class and are shared across all instantiated objects
        public static double taxRate = 0.15;

        // Const fields are static by default and must be initialized because they can't be changed afterwards
        public const int maxHoursWorked = 1000;

        // Properties
        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        public string FirstName
        {
            get { return firstName; }
            set { firstName = value; }
        }

        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }

        public string Email
        {
            get { return email; }
            set { email = value; }
        }

        public int NumberOfHoursWorked
        {
            get { return numberOfHoursWorked; }
            set { numberOfHoursWorked = value; }
        }

        public double Wage
        {
            get { return wage; }
            set
            {
                if (value < 0) wage = 0;
                else wage = value;
            }
        }

        public double? HourlyRate
        {
            get { return hourlyRate; }
            set { hourlyRate = value; }
        }

        public DateTime BirthDay
        {
            get { return birthDay; }
            set { birthDay = value; }
        }

        // Constructor
        public Employee(int id, string first, string last, string mail, DateTime bd, double? rate)
        {
            Id = id;
            FirstName = first;
            LastName = last;
            Email = mail;
            BirthDay = bd;
            HourlyRate = rate ?? 10;
        }

        // Constructor overloading - just like methods, we can have multiple constructors with the same name as long as params number or types differ
        // Declaring the second constructor by calling the first constructor
        public Employee(int id, string first, string last, string mail, DateTime bd) : this(id, first, last, mail, bd, 0)
        { }

        // Methods
        public void PerformWork()
        {
            NumberOfHoursWorked++;
            Console.WriteLine($"{FirstName} {LastName} is now working!");
        }

        public void StopWorking()
        {
            Console.WriteLine($"{FirstName} {LastName} has now stopped working!");
        }

        // public abstract double ReceiveWage();
        public double ReceiveWage()
        {
            double wageBeforeTax = NumberOfHoursWorked * 2 * HourlyRate.Value;
            double tax = wageBeforeTax * taxRate;
            Wage = wageBeforeTax - tax;

            Console.WriteLine($"The wage for {NumberOfHoursWorked} hours of work is {Wage}");
            NumberOfHoursWorked = 0;

            return Wage;
        }

        public void DisplayEmployeeDetails()
        {
            Console.WriteLine($"First name: {FirstName}\nLast name: {LastName}\nEmail: {Email}\nBirthday: {BirthDay.ToShortDateString()}\n" +
                $"Tax rate: {taxRate}");
        }

        // Static method - lives in the class, it is called using the class, not the objects that instantiate the class
        public static void DisplayTaxRate()
        {
            Console.WriteLine($"The current tax rate is {taxRate}");
            // We can only use static fields here because the other fields need an object to be instantiated
        }

        public virtual void GiveBonus()
        {
            Console.WriteLine($"{FirstName} {LastName} received a generic bonus of 100!");
        }

        public void GiveCompliment()
        {
            Console.WriteLine($"You've done a great job {FirstName}");
        }

        public int CompareTo(object? obj)
        {
            // cast object into an employee
            var otherEmployee = (Employee)obj;
            if (Id > otherEmployee.Id) return 1;
            else if (Id < otherEmployee.Id) return -1;
            else return 0;
        }
    }
}
