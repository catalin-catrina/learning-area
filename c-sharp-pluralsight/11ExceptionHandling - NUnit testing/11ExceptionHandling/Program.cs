namespace _11ExceptionHandling
{
    class Program
    {
        static void Main(string[] args)
        {
            // To write code for unhandled exceptions, you need to not have a "catch-all" block - catch(Exception ex) { }
            //AppDomain currentDomain = AppDomain.CurrentDomain;
            //currentDomain.UnhandledException += new UnhandledExceptionEventHandler(HandleException);

            Console.WriteLine("Enter first number");
            int number1 = int.Parse(Console.ReadLine());

            Console.WriteLine("Enter second number");
            int number2 = int.Parse(Console.ReadLine());

            Console.WriteLine("Enter operation");
            string operation = Console.ReadLine().ToUpperInvariant();

            var calculator = new Calculator();

            try
            {
                int result = calculator.Calculate(number1, number2, operation);
                DisplayResult(result);
            }
            catch (ArgumentNullException ex) when (ex.ParamName == "operation")
            {
                Console.WriteLine($"Operation was not provided. {ex}");
            }
            catch(ArgumentNullException ex)
            {
                Console.WriteLine($"An argument was null. {ex}");
            }
            // catch by trying an operation different than "/"
            catch(CalculationOperationNotSupportedException ex)
            {
                Console.WriteLine($"CalculationOperationNotSupportedException caught. {ex.Operation}");
                Console.WriteLine(ex);
            }
            // catch by didiving by 0
            // we'll also get the inner stack trace lower where we'll see the DivideByZeroException that was wrapped in the CalculationException
            catch(CalculationException ex)
            {
                Console.WriteLine($"CalculationException caught.");
                Console.WriteLine(ex);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Sorry, something went wrong {ex}");
            }
            finally
            {
                Console.WriteLine(("...finally..."));
            }
            
        }

        private static void DisplayResult(int result)
        {
            Console.WriteLine($"Result is {result}");
        }

        private static void HandleException(object sender, UnhandledExceptionEventArgs e)
        {
            Console.WriteLine($"Sorry there was a problem and we need to close. Details: {e.ExceptionObject}");
        }
    }
}