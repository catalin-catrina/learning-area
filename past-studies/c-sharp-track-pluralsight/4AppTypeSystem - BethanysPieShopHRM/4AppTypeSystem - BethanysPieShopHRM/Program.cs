namespace _4AppTypeSystem___BethanysPieShopHRM
{
    class Program
    {
        private static List<Employee> employees = new List<Employee>();

        static void Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("***********************************");
            Console.WriteLine("* Bethany's Pie Shop Employee App *");
            Console.WriteLine("***********************************");
            Console.ForegroundColor = ConsoleColor.White;

            string userSelection;

            do
            {
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine("********************");
                Console.WriteLine("* Select an action *");
                Console.WriteLine("********************");
                Console.ForegroundColor = ConsoleColor.White;

                Console.WriteLine("1: Register employee");
                Console.WriteLine("2: Register work hours for employee");
                Console.WriteLine("3: Pay employee");
                Console.WriteLine("9: Quit application");

                userSelection = Console.ReadLine();

                switch (userSelection)
                {
                    case "1":
                        RegisterEmployee();
                        break;
                    case "2":
                        RegisterWork();
                        break;
                    case "3":
                        PayEmployee();
                        break;
                    case "9": break;
                    default:
                        Console.WriteLine("Invalid selection, please try again.");
                        break;
                }
            }
            while (userSelection != "9");

            Console.WriteLine("Thanks for using the application.");
        }

        private static void RegisterEmployee()
        {
            Console.WriteLine("Creating an employee");

            Console.WriteLine("Enter the first name: ");
            string firstName = Console.ReadLine();

            Console.WriteLine("Enter the last name: ");
            string lastName = Console.ReadLine();

            Console.WriteLine("Enter the hourly rate: ");
            double hourlyRate = double.Parse(Console.ReadLine());

            Employee employee = new Employee(firstName, lastName, hourlyRate);
            employees.Add(employee);

            Console.WriteLine("Employee created!");
        }

        private static void RegisterWork()
        {
            Console.WriteLine("Select an employee");

            for (int i = 1; i <= employees.Count; i++)
            {
                Console.WriteLine($"{i} {employees[i - 1].FirstName} {employees[i - 1].LastName}");
            }

            int selection = int.Parse(Console.ReadLine());

            Console.WriteLine("Enter the number of hours worked: ");
            int hours = int.Parse(Console.ReadLine());

            Employee selectedEmployee = employees[selection - 1];
            int numberOfHoursWorked = selectedEmployee.PerformWork(hours);
            Console.WriteLine($"{selectedEmployee.FirstName} {selectedEmployee.LastName} has now worked {numberOfHoursWorked} hours in total.\n\n");
        }

        private static void PayEmployee()
        {
            Console.WriteLine("Select an employee");

            for (int i = 1; i <= employees.Count; i++)
            {
                Console.WriteLine($"{i}. {employees[i - 1].FirstName} {employees[i - 1].LastName}");
            }

            int selection = int.Parse(Console.ReadLine());

            Employee selectedEmployee = employees[selection - 1];

            int hoursWorked;
            double receivedWage = selectedEmployee.ReceiveWage(out hoursWorked);

            Console.WriteLine($"{selectedEmployee.FirstName} {selectedEmployee.LastName} has received a wage of {receivedWage}. " +
                $"The hours worked is reset to {hoursWorked}.\n\n");
        }
    }
}