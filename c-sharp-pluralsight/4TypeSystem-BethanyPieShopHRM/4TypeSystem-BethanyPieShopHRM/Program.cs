using System;
using System.Text;
using System.Globalization;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BethanyPieShopHRM
{
    class Program
    {
        static void Main (string[] args)
        {
            // Built-in data types
            // BuiltInDataTypes();

            // Strings();

            // Methods
            // Method overloading
            // MethodOverloading();

            // Passing by value vs passing by reference
            // Passing by value = a copy is passed to the method to work with, original values will not change
            // Passing by reference = a reference to the original value is passed to the method, original values will change
            // UsingValueParams();
            // UsingReferenceParams();
            // UsingReferenceParmsOut();

            // Using the params keyword - allows passing a variable amount of paramters into a method
            // We can use other parameters with the params keyword, but params needs to always be the last, it will "catch" the rest of the parameters
            // UsingParams();

            // Default parameters - we can specify default values for parameters and they'll take that value if we don't call the method with another explicit value
            // Default parameters need to be at the end of the method declaration
            // DefaultParameters();

            // Named arguments - allows us to call the method while specifying the order the arguments ourselves.
            // NamedArguments();

            // Custom types - there are internal libraries that we can import, but we can also install external ones
            // CustomTypes();

            // Enumerations
            // UsingEnums();

            // Structs
            // UsingStruct();
        }

        static void BuiltInDataTypes()
        {
            // Members - represent everything inside a class: properties, methods, interfaces
            // Members on primitives
            char a = ' ';
            bool myBool = char.IsWhiteSpace(a);
            Console.WriteLine(myBool);

            // int == Int32 structure behind the scenes
            int b = 32;
            Int32 d = 5;

            string c = b.ToString();
            Console.WriteLine(b.GetType()); // System.Int32
            Console.WriteLine(c.GetType()); // System.String

            string myCoolString = "Nice weather";
            Console.WriteLine(myCoolString.ToLower()); // nice weather
            Console.WriteLine(myCoolString.ToUpper()); // NICE WEATHER
            Console.WriteLine(myCoolString.Length); // 12
            Console.WriteLine(myCoolString.Replace("Nice", "Amazing")); // Amazing weather

            char myBeautifulChar = 'b';
            Console.WriteLine(myBeautifulChar.ToString().GetType()); // System.String
            Console.WriteLine(myBeautifulChar.GetType()); // System.Char
            Console.WriteLine(char.IsDigit('a')); // False
            Console.WriteLine(char.IsDigit('2')); // True
            Console.WriteLine(char.IsLetter('a')); // True

            int myInt = int.MinValue;
            Int32 myInt2 = int.MaxValue;

            Console.WriteLine(myInt); // -2147483648
            Console.WriteLine(myInt2); // 2147483647

            // DateTime
            DateTime currentDate = DateTime.Now;
            Console.WriteLine(currentDate); // 04/04/2022 22:50:46

            DateTime randomDate = new DateTime(2022, 6, 15, 19, 30, 0);
            Console.WriteLine(randomDate); // 15/06/2022 19:30:00

            DateTime datesCanMath1 = currentDate.AddDays(20);
            Console.WriteLine(datesCanMath1); // 24/04/2022 22:54:45

            DateTime datesCanMath2 = currentDate.AddHours(2);
            Console.WriteLine(datesCanMath2); // 05/04/2022 00:56:05

            bool isDSVT = currentDate.IsDaylightSavingTime();
            Console.WriteLine(isDSVT); // True

            DateTime startHour = DateTime.Now.AddHours(10);
            TimeSpan workTime = new TimeSpan(4, 15, 0);
            DateTime endhour = startHour.Add(workTime);
            Console.WriteLine($"Starting work at: {startHour} and getting out of the office at: {endhour}");

            Console.WriteLine(DateTime.Now.ToShortTimeString()); // 23:02
            Console.WriteLine(DateTime.Now.ToLongTimeString()); // 23:02:02
            Console.WriteLine(DateTime.Now.ToLongDateString()); // 04 April 2022
            Console.WriteLine(DateTime.Now.ToShortDateString()); // 04/04/2022
        }

        static void Strings()
        {
            // Three differnet ways to declare a variable as a string, they all do the same
            string myName = "Leo";
            var coolName = "Julien";
            String myOtherName = "Catalin";
            System.String dogName = "Myike";

            Console.WriteLine($"{myName}, {coolName}, {myOtherName}, {dogName}");
            Console.WriteLine();

            // Empty string
            string emptyString1 = "";
            string emptyString2 = String.Empty;
            Console.WriteLine($"{emptyString1}, {emptyString2}");
            Console.WriteLine();

            // Declaring a string as null, or not giving it a value at all, makes it point at nothing. We can however give it a value afterwards
            string kewlString = null;
            string badString;
            kewlString = "Giving this string a value";
            badString = "Giving this bad boy a value too";
            Console.WriteLine($"{kewlString}, {badString}");
            Console.WriteLine();

            // Methods and properties
            string name1 = "Catalin";
            string name2 = "Catrina";
            Console.WriteLine();

            // Concatenation
            string fullName = name1 + " " + name2;
            string fullName2 = String.Concat(name1, " ", name2);
            string fullName3 = $"{name1} {name2}";
            Console.WriteLine($"{fullName}, {fullName2}, {fullName3}");
            Console.WriteLine();

            // ToLower(), ToUpper(), Trim(), Substring(), Contains() methods
            string myLowerCaseName = name1.ToLower();
            string myUpperCaseName = name2.ToUpper();

            string firstThreeLetters = name1.Substring(0, 3);
            Console.WriteLine($"{myLowerCaseName}, {myUpperCaseName}, {firstThreeLetters}");

            string amazingWhiteSpace = "   This string has a lot of whitespace to be trimmed    ";
            string trimmedWhiteSpace = amazingWhiteSpace.Trim();
            Console.WriteLine(trimmedWhiteSpace);
            Console.WriteLine();

            string beautifulString = "What a beautiful day this is isn't it?";
            bool yesItIs = beautifulString.Contains("beautiful");
            Console.WriteLine(yesItIs); // true
            Console.WriteLine();

            // Most string methods return the modified string, so we can chain methods
            string nameWithWhiteSpace = "  catalin";
            string correctName = nameWithWhiteSpace.Trim().Substring(0, 1).ToUpper() + nameWithWhiteSpace.Trim().Substring(1, 6);
            Console.WriteLine(correctName);
            Console.WriteLine();

            // Length
            string goodString = "Something, Something";
            int goodStringsLength = goodString.Length;
            Console.WriteLine(goodStringsLength);
            Console.WriteLine();

            // Escaping text
            string escapeOne = "New\nline\n"; // new line
            string escapeTwo = "C:\\data\\file.cs\n"; // escaping \
            string escapeThree = @"Escaping is not allowed here \n \\ \a \b nothing works"; // @"" = can't escape text
            Console.WriteLine($"{escapeOne}{escapeTwo}{escapeThree}");
            Console.WriteLine();

            // Compare strings
            string namelyName1 = "Catalin";
            string namelyName2 = "caTaLiN";

            bool compareStrings1 = namelyName1 == namelyName2; // False
            bool compareStrings2 = namelyName1.Equals(namelyName2); // False
            bool compareStrings3 = namelyName1.ToLower() == namelyName2.ToLower(); // True
            Console.WriteLine($"{compareStrings1}, {compareStrings2}, {compareStrings3}");
            Console.WriteLine();

            // Immutability - strings are reference types
            string test1 = "Catalin";
            string test2 = test1; // now test2 points to the same location in memomory as test1, where the string "Catalin" is

            test1 += " Catrina"; // a new string was created, at another location in memory, and test1 now points to "Catalin Catrina" instead of "Catalin"
            Console.WriteLine($"{test1}, {test2}");
            Console.WriteLine();

            string indexes = string.Empty;
            for (int i = 0; i < 100; i++)
            {
                indexes += i.ToString(); // a new string would be created at every iteration, not very optimal but usable
            }

            // A more efficient way is to use a Stringbuilder data type, more memory efficient
            string testing1 = "Catalin";
            string testing2 = "Catrina";
            StringBuilder builder = new StringBuilder();
            builder.AppendLine($"Firstname: {testing1}");
            builder.Append("Lastname: ");
            builder.Append(testing2);
            string result = builder.ToString();
            Console.WriteLine($"{result}"); // FirstName: Catalin LastName: Catrina
            Console.WriteLine();

            // Parsing
            // This will only work if the string can be parsed into an int
            // string qualityInput = Console.ReadLine();
            // int parsingThisString = int.Parse(qualityInput);
            // Console.WriteLine(parsingThisString);

            // A better way is to use TryParse
            string qualityInput2 = Console.ReadLine();
            int parsingThisGirl;
            if (int.TryParse(qualityInput2, out parsingThisGirl))
            {
                Console.WriteLine("Parsed");
            }
            else
            {
                Console.WriteLine("Nope");
            }

            string hiringDateString = "01/04/2022";
            DateTime hireDate;
            if (DateTime.TryParse(hiringDateString, out hireDate))
            {
                Console.WriteLine("Parsed date: " + hiringDateString);
            }
            else
            {
                Console.WriteLine("Could not parse string into date");
            }

            var cultureInfo = new CultureInfo("ro-RO");
            string birthDateString = "29 Septembrie 1994";
            var birthDate = DateTime.Parse(birthDateString, cultureInfo);
            Console.WriteLine($"Birthdate: {birthDate}"); // Birthdate: 9/29/1994 12:00:00 AM
        }

        // Method overloading - can have methods with the same name but different nr or type of params
        public static void MethodOverloading()
        {
            double yearlySalary = CalcSalary(1500.69, 12);
            int integerYearlySalary = CalcSalary(1500, 12);
            int integerYearlySalaryWithBonus = CalcSalary(1500, 12, 3000);
            Console.WriteLine($"{yearlySalary}, {integerYearlySalary}, {integerYearlySalaryWithBonus}");
        }
        public static double CalcSalary(double salary, int months)
        {
            return salary * months;
        }

        public static int CalcSalary(int salary, int months)
        {
            return salary * months;
        }

        public static int CalcSalary(int salary, int months, int bonus)
        {
            return salary * months + bonus;
        }

        // Passing by value
        public static void UsingValueParams()
        {
            int monthlyWage1 = 1234;
            int monthlyWage2 = 3251;
            int months1 = 12;
            int months2 = 8;
            int bonus = 300;

            int yearlyWageEmpl1 = CalcYearlyWageByValue(monthlyWage1, months1, bonus);
            int yearlyWageEmpl2 = CalcYearlyWageByValue(monthlyWage2, months2, bonus);

            Console.WriteLine($"Salary for employer 1 is: {yearlyWageEmpl1}");
            Console.WriteLine($"Salary for employer 2 is {yearlyWageEmpl2}");

            // The value of the bonus variable didn't change despite changing it in CalcYearlyWage method because we only passed by value
            Console.WriteLine(bonus); // 300
        }

        public static int CalcYearlyWageByValue(int wage, int nrOfMonths, int bonus)
        {
            if (wage < 2000) bonus = bonus * 10;
            return wage * nrOfMonths + bonus;
        }

        // Passing by reference with "ref" keyword
        public static void UsingReferenceParams()
        {
            int monthlyWage1 = 1234;
            int monthlyWage2 = 3251;
            int months1 = 12;
            int months2 = 8;

            // We need to initialize the variable in the caller when using the ref keyword
            int bonus = 300;

            int yearlyWageEmpl1 = CalcYearlyWageByRefWithRef(monthlyWage1, months1, ref bonus);
            int yearlyWageEmpl2 = CalcYearlyWageByRefWithRef(monthlyWage2, months2, ref bonus);

            Console.WriteLine($"Salary for employer 1 is: {yearlyWageEmpl1}");
            Console.WriteLine($"Salary for employer 2 is {yearlyWageEmpl2}");

            // The value of the original bonus variable changed because we passed a reference to it
            Console.WriteLine(bonus); // 3000
        }

        public static int CalcYearlyWageByRefWithRef(int wage, int nrOfMonths, ref int bonus)
        {
            if (wage < 2000) bonus = bonus * 10;
            return wage * nrOfMonths + bonus;
        }

        // Passing by reference with "out" keyword
        public static void UsingReferenceParmsOut()
        {
            int monthlyWage1 = 1234;
            int monthlyWage2 = 3251;

            // We don't need to initialize the variables in the caller when using out keyword
            int months1;
            int months2;

            var yearlyWageEmpl1 = CalcYearlyWageByRefWithOut(monthlyWage1, out months1, out var bonus1);
            var yearlyWageEmpl2 = CalcYearlyWageByRefWithOut(monthlyWage2, out months2, out var bonus2);

            Console.WriteLine($"Salary for employer 1 is: {yearlyWageEmpl1}");
            Console.WriteLine($"Salary for employer 2 is {yearlyWageEmpl2}");

            // The value of the original bonus variables changed because we passed a reference to it
            Console.WriteLine(months1);
            Console.WriteLine(months2);
            Console.WriteLine(bonus1);
        }

        public static int CalcYearlyWageByRefWithOut(int wage, out int nrOfMonths, out int bonus)
        {
            bonus = new Random().Next(1000);
            nrOfMonths = new Random().Next(11) + 1;
            return wage * nrOfMonths + bonus;
        }

        // Using the "params" keyword
        public static void UsingParams()
        {
            int wage1 = 2134, wage2 = 3442, wage3 = 459, wage4 = 981;
            double average = CalculateAverageSalary(wage1, wage2, wage3, wage4);

            Console.WriteLine(average);  // 1754
        }

        public static double CalculateAverageSalary(params int[] wages)
        {
            int total = 0;
            for (int i = 0; i < wages.Length; i++)
            {
                total = total + wages[i];
            }
            return total / wages.Length;
        }

        // Default parameters
        public static void DefaultParameters()
        {
            int a = 1, b = 2, c = 3;
            var average1 = CalcAverageDefaultParams(a, b);
            var average2 = CalcAverageDefaultParams(a, b, c);
            Console.WriteLine($"Average 1 is {average1}"); // 3
            Console.WriteLine($"Average 2 is {average2}"); // 2
        }

        public static double CalcAverageDefaultParams(int a, int b, int c = 6)
        {
            return (a + b + c) / 3;
        }

        // Named arguments
        public static void NamedArguments()
        {
            int monthlyWage = 1234;
            int months = 12;
            int bonus = 500;

            var salary = CalcYearlyWageByValue(bonus: bonus, wage: monthlyWage, nrOfMonths: months);
            Console.WriteLine(salary);
        }

        // Custom types
        public static void CustomTypes()
        {
            // There are a lot of out-of-the-box ready to use libraries (dlls / namespaces) in .NET 
            // We need to bring in the System.Collections.Generic namespace so we can make the classes in there available in our app
            List<string> myString = new List<string>();

            // But not everything is in there, that's why we can also install external dlls (libraries) with NuGet and use them in our app
            // NuGet is a package manager inside Visual Studio
            // We installed the Newtonsoft.Json library and imported it into our app with "using Newtonsoft.Json;"
        }

        // Enumerations
        private static void UsingEnums()
        {
            EmployeeType employeeType = EmployeeType.Manager;
            StoreType storeType = StoreType.Seating;
            int wage = 1000;

            CalculateWage(wage, employeeType, storeType);
        }

        private static void CalculateWage(int baseWage, EmployeeType employeeType, StoreType store)
        {
            int calculatedWage = 0;

            if (employeeType == EmployeeType.Manager) calculatedWage = baseWage * 3;
            else calculatedWage = baseWage * 2;

            if (store == StoreType.FullPieRestaurant) calculatedWage = baseWage + 500;

            Console.WriteLine(calculatedWage);
        }

        private static void UsingStruct()
        {
            Employee employee;
            employee.Name = "Catalin";
            employee.Wage = 1500;
            employee.Work();
        }
    }
    enum EmployeeType
    {
        // By default each of the types maps to values starting from index 0
        Sales,
        Manager,
        Research,
        StoreManager,
    }

    enum StoreType
    {
        // But we can change the index each type maps to
        PieCorner = 10,
        Seating = 20,
        FullPieRestaurant = 100,
        Undefined = 99
    }

    struct Employee
    {
        public string Name;
        public int Wage;

        public void Work()
        {
            Console.WriteLine($"{Name} is doing some work.");
        }
    }
}