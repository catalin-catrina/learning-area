using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.HR
{
    public class Manager : Employee
    {
        // Creating a child class of the Employee class by calling "base" which is the constructor of the Employee class, with the variables passed into
        // the Manager() constructor
        public Manager(int id, string first, string last, string mail, DateTime bd, double? rate) : base(id, first, last, mail, bd, rate)
            { }

        public void AttendManagementMeeting()
        {
            NumberOfHoursWorked += 10;
            Console.WriteLine($"Manager {FirstName} {LastName} is now attending a long meeting.");
        }

        public override void GiveBonus()
        {
            if (NumberOfHoursWorked > 5)
            {
                Console.WriteLine($"Manager {FirstName} {LastName} received a bonus of 500!");
            }
            else
            {
                Console.WriteLine($"Manager {FirstName}, {LastName} received a bonus of 250!");
            }
        }

        // only if the Employee class is declared abstract
        //public override double ReceiveWage()
        //{
        //    double wageBeforeTax = NumberOfHoursWorked * 2 * HourlyRate.Value;
        //    double tax = wageBeforeTax * taxRate;
        //    Wage = wageBeforeTax - tax;

        //    Console.WriteLine($"The wage for {NumberOfHoursWorked} hours of work is {Wage}");
        //    NumberOfHoursWorked = 0;

        //    return Wage;
        //}
    }
}
