using NUnit.Framework;

namespace _11ExceptionHandling.Tests.NUnit
{
    public class CalculatorShould
    {
        // create a test method that's going to check that the calculator throws an unsupported operation exception
        [Test]
        public void ThrowWhenUnsupportedOperation()
        {
            // sut is an acronym for system under test
            var sut = new Calculator();

            // Since we're in NUnit here, we can Assert that a condition is true
            // This will pass when our code will throw a CalculationOperationNotSupportedException, and in this case it will because we passed "+" which is an invalid operation. Remember that we made it so we can only use "/"
            Assert.That(() => sut.Calculate(1, 2, "+"), Throws.TypeOf<CalculationOperationNotSupportedException>());

            // In order for this assert to be true, the thrown CalculationOperationNotSupportedException has to have its operation property equal to "+"
            Assert.That(() => sut.Calculate(1, 2, "+"), Throws.TypeOf<CalculationOperationNotSupportedException>().With.Property("Operation").EqualTo("+"));
        
            // Check that operation is equal to addition, but this time by catching the Assert.Throws into a variable
            var ex = Assert.Throws<CalculationOperationNotSupportedException>(() => sut.Calculate(1, 1, "+"));
            Assert.That(ex.Operation, Is.EqualTo("+"));
        }
    }
}