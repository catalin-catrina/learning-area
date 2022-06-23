namespace _11ExceptionHandling
{
    // Here we create another custom exception class that inherits from CalculationException
    // This will allow us to specify the operation that's not supported
    // We're creating this additional custom exception because we want to be able to handle CalculationOperationNotSupported exceptions differently from the base CalculationException
    public class CalculationOperationNotSupportedException : CalculationException
    {
        private const string DefaultMessage = "Specified operation was out of the range of valid values";

        // this will represent the unsupported operation that caused this exception (e.g trying to perform substraction if its not supported)
        public string Operation { get; }

        // default constructor with only a default predefined message
        public CalculationOperationNotSupportedException() : base(DefaultMessage)
        {
        }

        // creates a new instance of CalculationOperationNotSupportedException with a predefined message and a wrapped inner exception
        public CalculationOperationNotSupportedException(Exception innerException) : base(DefaultMessage, innerException)
        {
        }

        // creates a new instance of CalculationOperationNotSupportedException with a user-supplied message and a wrapped inner exception
        public CalculationOperationNotSupportedException(string message, Exception innerException) : base(message, innerException)
        {
        }

        // creates a new instance of CalculationOperationNotSupportedException with a default message and the opperation that is not supported
        // constructor that allows the Operation to be set
        public CalculationOperationNotSupportedException(string operation) : base(DefaultMessage)
        {
            Operation = operation;
        }

        // we can continue to add constructor overloads that may be useful, so let's add one more
        // creates a new instance with the operation that is not supported and a user message
        public CalculationOperationNotSupportedException(string operation, string message): base(message)
        {
            Operation = operation;
        }

        public override string ToString()
        {
            // if operation is null, return the base message, else return base message plus the additional text of the unsupported operation
            if (Operation == null)
            {
                return base.ToString();
            }
            else
            {
                return base.ToString() + Environment.NewLine + $"Unsupported operation: {Operation}";
            }
        }
    }
}
