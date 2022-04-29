using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

// Tests should have a separate folder in the solution, and in that folder we make new projects.
// Test projects should have the name of the project they are testing plus the test suffix: ACM.BLTest

// Before we can test our class, we need to reference it from the test project
// Right click on the References folder in current project (ACM.BLTest) -> add reference -> click the project to reference (that you need to test)
// Our test project - ACM.BLTest - has now access to the classes in our business layer project project (ACM.BL), so we can test them

// Test classes and test files should have the name of the file we are testing with a test suffix: CustomerTest
// Once the class is in place, we can add a method to the class for each test we wish to perform on that class

namespace ACM.BLTest
{
    [TestClass]
    public class CustomerTest
    {
        [TestMethod]
        public void FullNameTestValid()
        {
            // Arrange
            

            // Act

            // Assert
        }
    }
}
