namespace _11ExceptionHandling
{
    // Naming convention when creating a custom exception type: use "Exception" at the end
    // Custom exceptions need to of course inherit from System.Exception
    public class CalculationException : Exception
    {
        private const string DefaultMessage = "An error occurred during calculation. Ensure that the operator is supported and that the values  are within the valid ranges for the requested operation.";

        // In addition to the default parameterless constructor, we also need to create the three standard exception constructor overloads
        
        // Default parameterless constructor - here we call the constructor of System.Exception that allows us to specify a message
        public CalculationException() : base(DefaultMessage) 
        { 
        }

        // The first of the three additional constructor overloads should allow the user to supply a custom message instead of the default one above
        // And once again we call the System.Exception base class constructor that allows us to provide a message
        public CalculationException(string message) : base(message) 
        { 
        }

        // The next constructor should allow the user to wrap an exception by specifying an inner exception
        // So we create this constructor which takes an exception as a parameter and once again call the base class' constructors
        // This time the version of the constructor we're going to call is the version that accepts a string and an innerException
        public CalculationException (Exception innerException) : base(DefaultMessage, innerException) 
        { 
        }
        
        // The final constructor allows the user to specify a custom message and also wrap an exception
        public CalculationException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
