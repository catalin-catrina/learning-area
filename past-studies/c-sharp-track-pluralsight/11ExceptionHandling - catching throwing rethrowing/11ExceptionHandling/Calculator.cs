namespace _11ExceptionHandling
{
    public class Calculator
    {
        public int Calculate(int number1, int number2, string operation)
        {
            // just bubbling this exception up the stack where we set the paramName to operation so we can catch it in Main and test exceptions with filters
            //throw new ArgumentNullException(paramName: nameof(operation));
         
            //if (operation is null)
            //{
            //    throw new ArgumentNullException(nameof(operation));
            //}

            // shorter way of doing the same thing will nullish coalescing operator
            // if the left handside of the null coalescing operator is not null, it will be returned
            // if left handside is null then the right handside will be evaluated
            // we can now use nonNullOperation instead of operation everywhere operation was passed in
            // and we can at least be sure this variable will be a non null string
            string nonNullOperation = operation ?? throw new ArgumentNullException(nameof(operation));  

            //if (operation == "/")
            if (nonNullOperation == "/")
            {
                try
                {
                    return Divide(number1, number2);
                }
                catch (DivideByZeroException ex)
                {
                    Console.WriteLine("...logging...");
                    // bubble up the exception up the call stack
                    // if you want to catch the exception and continue to bubble it up the call stack, you still use "throw" but you don't explicitly throw the exception instance (ex)
                    // that was caught here, othewrwise the stack trace will be affected
                    // if we throw the exception instance that was thrown here, the console will tell us the exception originated here in this method, while in reality it originated in Divide()
                    //throw;

                    // or instead of throwing the exception up the call stack, we may want to wrap it
                    // sometimes you may want to catch an exception of one type and then wrap it in another exception type
                    // wrapping exceptions should only be used when the receiver of the exception, for example a catch block in some higher level code, would not find the original
                    // exception type meaningful. for example the receiver of DivideByZeroException is our Main method. We might decide that the exception is not meaningful and perhaps
                    // its too low level of an exception. instead we might decide that the Main() method finds arithmetic exceptions more meaningful and it doesnt find meaning in all
                    // the different types of arithmetic errors like dividebyzero or overflow exceptions
                    // in this example we might catch the DivideByZeroException and wrap it in an ArithmeticException instance
                    throw new ArithmeticException("An error occurred during calculation", ex);
                }
            }
            else
            {
                
                throw new ArgumentOutOfRangeException(nameof(operation), "The mathematical operator is not supported.");
                
                //Console.WriteLine("Unknown operation.");
                //return 0;
            }
        }
        private int Divide(int number, int divisor) => number / divisor;
    }

    // exception in switch statement
    public class Calculator1
    {
        public int Calculate(int number1, int number2, string operation)
        {
            return operation switch
            {
                "/" => number1 / number2,
                "+" => number1 + number2,
                _ => throw new ArgumentOutOfRangeException()
            };
        }
    }
}
