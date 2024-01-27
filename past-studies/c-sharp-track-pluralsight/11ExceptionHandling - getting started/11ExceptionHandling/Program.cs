namespace _11ExceptionHandling
{
    class Program
    {
        static void Main(string[] args)
        {
            // Because we're dealing with user input, including the operation that the user selects, we should add some validation code to the Main method to validate this input
            // Since invalid input is part of the normal program flow, we can also write logic to try to prevent the Calculate() method being called for unsupported input or
            // unsupported operations
            Console.WriteLine("Enter first number");
            int number1 = int.Parse(Console.ReadLine());

            Console.WriteLine("Enter second number");
            int number2 = int.Parse(Console.ReadLine());

            Console.WriteLine("Enter operation");
            string operation = Console.ReadLine().ToUpperInvariant();

            var calculator = new Calculator();

            // We're going to catch the ArgumentOutOfRangeException here so we don't cause an unhandled exception to be bubbled up to Windows OS
            // If however we wanted a more general catch block that's going to catch all exceptions, we can just specify Exception which is the base type for all exception types
            // an Exception type will catch all thrown exceptions because System.Exception is the base type for all Exception types
            // After the exception we also have the variable name "ex". When the variable block catches an exception, this variable ex will be set to the exception instance
            // Because we're not catching a specific type of exception here all we can do is print a message to the user and output the exception details
            try
            {
                int result = calculator.Calculate(number1, number2, operation);
                DisplayResult(result);
            }
            //catch (ArgumentOutOfRangeException ex)
            catch (Exception ex)
            {
                Console.WriteLine($"Sorry, something went wrong {ex}");
            }
            
        }

        private static void DisplayResult(int result)
        {
            Console.WriteLine($"Result is {result}");
        }
    }
}