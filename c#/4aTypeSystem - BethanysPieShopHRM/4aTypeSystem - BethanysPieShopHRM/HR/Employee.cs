using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.HR
{
    // Namespaces usually have the name of the project / solution, classes usually have the name of the file, and are one per file
    // Classes contain members: fields, methods, constructors or properties
    // We declare the fields as private so they can't be accessed from outside the class
    // Fields can be managed through properties, which get (return) them and/or set them (assign them a value w or w/o validation)
    // Constructors work exactly like in JavaScript.
    // It's a good practice to work with properties in the constructor and in methods, and not with the fields, but not mandatory

    // "?" after the value type means the primitive value can be null(able), may be useful when we get rows from database that can be null
    // We use the ?? nullish coalescing operator in the constructor to assign a value to the value declared with valuetype? in case it's null
    // We use variableName.Value to get the value out of a type declared with ? (declared as may contain null)
    public class Employee
    {
        // Fields
        private string firstName;
        private string lastName;
        private string email;

        private int numberOfHoursWorked;
        private double wage;
        private double? hourlyRate;
        private DateTime birthDay;

        private EmployeeType type;

        // Static fields and methods live inside the class and are shared across all instantiated objects
        public static double taxRate = 0.15;

        // Const fields are static by default and must be initialized because they can't be changed afterwards
        public const int maxHoursWorked = 1000;

        // Properties
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

        public EmployeeType Type
        {
            get { return type; }
            set { type = value; }
        }

        // Constructor
        public Employee(string first, string last, string mail, DateTime bd, EmployeeType emType, double? rate)
        {
            FirstName = first;
            LastName = last;
            Email = mail;
            BirthDay = bd;
            Type = emType;
            HourlyRate = rate ?? 10;
        }

        // Constructor overloading - just like methods, we can have multiple constructors with the same name as long as params number or types differ
        // Declaring the second constructor by calling the first constructor
        public Employee(string first, string last, string mail, DateTime bd, EmployeeType emType) : this(first, last, mail, bd, emType, 0)
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

        public double ReceiveWage()
        {
            double wageBeforeTax = NumberOfHoursWorked * HourlyRate.Value;
            double taxAmount = wageBeforeTax * taxRate;

            Wage = wageBeforeTax - taxAmount;

            Console.WriteLine($"The wage for {NumberOfHoursWorked} hours of work is {Wage}");
            return Wage;
        }

        public void DisplayEmployeeDetails()
        {
            Console.WriteLine($"First name: {FirstName}\nLast name: {LastName}\nEmail: {Email}\nBirthday: {BirthDay.ToShortDateString()}\n" +
                $"Employee type: {Type}\nTax rate: {taxRate}");
        }

        // Static method - lives in the class, it is called using the class, not the objects that instantiate the class
        public static void DisplayTaxRate()
        {
            Console.WriteLine($"The current tax rate is {taxRate}");
            // We can only use static fields here because the other fields need an object to be instantiated
        }
    }
}
