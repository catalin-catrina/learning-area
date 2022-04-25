namespace _11ExceptionHandling
{
    public class Calculator
    {
        public int Calculate(int number1, int number2, string operation)
        {
            //if (operation is null)
            //{
            //    throw new ArgumentNullException(nameof(operation));
            //}

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
                    //throw new ArithmeticException("An error occurred during calculation", ex);

                    // in our case the inner exception is this DivideByZeroException
                    throw new CalculationException(ex);
                }
            }
            else
            {
                // we throw the custom exception CalCulationOperationNotSupportedException with the constructor overload that allows us to specify the operation
                throw new CalculationOperationNotSupportedException(nonNullOperation);

                //throw new ArgumentOutOfRangeException(nameof(operation), "The mathematical operator is not supported.");
                
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
