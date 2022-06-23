namespace _11ExceptionHandling
{
    public class Calculator
    {
        public int Calculate(int number1, int number2, string operation)
        {
            if (operation == "/")
            {
                return Divide(number1, number2);
            }
            else
            {
                // we can also throw our own exception. the throw keyword signals that an error has occurred during runtime
                // we actually have to create an instance of an exception to throw, and that's what exception types ultimately inherit from the System.Exception base class
                // because System.Exception is the base class for all exceptions we could throw an instance of System.Exception here, but what we want to do is to throw an exception
                // of the type of the error that occurred, so we're going to use ArgumentOutOfRangeException 
                // remember that we have a number of constructors, including a constructor overload that allows us to specify the parameter name that caused the exception, and also
                // the exception message. In our case the "operation" parameter caused the exception, but it's not good to hardcode parameter names as strings("operation"),
                // instead we should make use of the nameof() operator, and as a parameter to nameof() reference the actual parameter there 
                // now if at some point in the future you refactor this Calculate() method and change the name of the "operation" parameter, you'll also need to change it in the 
                // exception instance and if you don't you get a build error which can help prevent bugs
                // the second parameter is the "message" parameter: "The mathematical operator is not supported."
                // so now we're throwing this ArgumentOutOfRangeException when we get an invalid operation, it might be a good idea to actually catch it somewhere higher up the call stack 
                throw new ArgumentOutOfRangeException(nameof(operation), "The mathematical operator is not supported.");
                
                //Console.WriteLine("Unknown operation.");
                //return 0;
            }
        }

        /// <summary>
        /// Here if we try to divide by 0 we get a DivideByZeroException
        /// If we run the program, and click View Details in the "Exception Unhandled" window, a window pops up with all the properties of the exception.
        /// If we click on the view button of the StackTrace's property value, which is a string property, we'll be able to see the trace of the stack showing us
        /// where the original exception occurred: The DivideByZeroException originated in the Divide() method of the Calculator class, and because there was no try catch
        /// it bubbled up to the Calculate() method of the Calculator class. The Calculate() method did not have a try catch block so it bubbled up the call stack into the 
        /// calling method which was the Main() method of the Program class. And because in the Main() method we do not have a try catch block it continues to bubble up
        /// and results into an unhandled exception
        /// </summary>
        private int Divide(int number, int divisor) => number / divisor;
    }
}
