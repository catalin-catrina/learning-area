using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _4AppTypeSystem___BethanysPieShopHRM
{
    public class Employee
    {
        // Fields
        private string firstName;
        private string lastName;

        private int numberOfHoursWorked;
        private double wage;
        private double hourlyRate;

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

        public double HourlyRate
        {
            get { return hourlyRate; }
            set { hourlyRate = value; }
        }

        // Constructor
        public Employee(string first, string last, double rate)
        {
            FirstName = first;
            LastName = last;
            HourlyRate = rate;
        }

        // Methods
        public int PerformWork(int hours)
        {
            NumberOfHoursWorked += hours;
            return NumberOfHoursWorked;
        }

        public double ReceiveWage(out int hoursWorked)
        {
            Wage = NumberOfHoursWorked * HourlyRate;
            Console.WriteLine($"The wage for {NumberOfHoursWorked} hours of work is {Wage}");

            NumberOfHoursWorked = 0;
            hoursWorked = NumberOfHoursWorked;

            return Wage;
        }
    }
}
