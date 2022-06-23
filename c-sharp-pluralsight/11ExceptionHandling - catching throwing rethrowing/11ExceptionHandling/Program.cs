namespace _11ExceptionHandling
{
    class Program
    {
        static void Main(string[] args)
        {
            // sometimes you may want to execute code when an unhandled exception bubbles all the way up and before it reaches the OS
            // for example in ASP.NET Core you may make use of exception handling filters or error handling middleware and error pages
            // because we're working in a console app here, we can make use of the AppDomain's UnhandledException event

            // wiring up the current app domain's UnhandledException to execute some logic for any unhandled exceptions
            // for this to work we need to comment out the catch (Exception ex) {} part because that will catch all exceptions and we have none left to test our UnhandledException
            
            // this gives us the AppDomain that we're working in
            AppDomain currentDomain = AppDomain.CurrentDomain;

            // wire up the current AppDomain's UnhandledException event to an event handler 
            // we're going to wire up this event to this HandleException method
            currentDomain.UnhandledException += new UnhandledExceptionEventHandler(HandleException);

            Console.WriteLine("Enter first number");
            int number1 = int.Parse(Console.ReadLine());

            Console.WriteLine("Enter second number");
            int number2 = int.Parse(Console.ReadLine());

            Console.WriteLine("Enter operation");
            string operation = Console.ReadLine().ToUpperInvariant();

            var calculator = new Calculator();

            // catching different exception types with multiple catch blocks
            try
            {
                int result = calculator.Calculate(number1, number2, operation);
                DisplayResult(result);
            }
            // exception filter - using the "when" keyword
            // this excception only triggers when the ParamName property of the ArgumentNullExcepion instance called "ex" is "operation"
            catch (ArgumentNullException ex) when (ex.ParamName == "operation")
            {
                Console.WriteLine($"Operation was not provided. {ex}");
            }
            catch(ArgumentNullException ex)
            {
                Console.WriteLine($"An argument was null. {ex}");
            }
            catch(ArgumentOutOfRangeException ex)
            {
                Console.WriteLine($"Operation is not supported. {ex}");
            } 
            //catch (Exception ex)
            //{
            //    Console.WriteLine($"Sorry, something went wrong {ex}");
            //}
            // finally block always gets executed after the try block, whether or not try will trigger an exception  
            // order of execution: if try does not trigger an exception: try => finally
                // if try triggers an exception: try => catch => finally
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