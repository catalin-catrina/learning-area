using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BethanysPieShopHRM.HR
{
    public class StoreManager : Employee
    {
        public StoreManager(int id, string first, string last, string mail, DateTime bd, double? rate) : base(id, first, last, mail, bd, rate)
        { }

        //public override double ReceiveWage()
        //{
        //    double wageBeforeTax = NumberOfHoursWorked * HourlyRate.Value;
        //    double tax = wageBeforeTax * taxRate;
        //    Wage = wageBeforeTax - tax;

        //    Console.WriteLine($"The wage for {NumberOfHoursWorked} hours of work is {Wage}");
        //    NumberOfHoursWorked = 0;

        //    return Wage;
        //}
    }
}
