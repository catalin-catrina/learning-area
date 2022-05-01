using ACM.BL;
using Microsoft.VisualStudio.TestTools.UnitTesting;

// Create a new solution folder called Tests
// Inside that folder, create a new project for each project you want to test, and call it ProjectName + Test suffix (ACM.BLTest)
// Create a new test class for each class that you want to test, and name it ClassName + Test Suffix (CustomerTest)

namespace ACM.BLTest
{
    [TestClass]
    public class CustomerTest
    {
        [TestMethod]
        public void FullNameTestValid()
        {
            // Arrange
            //Customer customer = new Customer();
            //customer.FirstName = "Bilbo";
            //customer.LastName = "Baggins";
            Customer customer = new Customer
            {
                FirstName = "Bilbo",
                LastName = "Baggins"
            };
            string expected = "Baggins, Bilbo";

            // Act
            string actual = customer.FullName;

            // Assert
            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void FullNameFirstNameEmpty()
        {
            Customer customer = new Customer
            {
                LastName = "Baggins"
            };
            string expected = "Baggins";

            string actual = customer.FullName;

            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void FullNameLastNameEmpty()
        {
            Customer customer = new Customer
            {
                FirstName = "Bilbo"
            };
            string expected = "Bilbo";

            string actual = customer.FullName;

            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void StaticTest()
        {
            var c1 = new Customer();
            c1.FirstName = "Bilbo";
            Customer.InstanceCount += 1;
            
            var c2 = new Customer();
            c2.FirstName = "Frodo";
            Customer.InstanceCount += 1;

            var c3 = new Customer();
            c3.FirstName = "Rosie";
            Customer.InstanceCount += 1;

            Assert.AreEqual(3, Customer.InstanceCount);
        }

        [TestMethod]
        public void ValidateValid()
        {
            var customer = new Customer
            {
                LastName = "Baggins",
                EmailAddress = "fbaggins@hobbiton.me"
            };

            var expected = true;

            var actual = customer.Validate();

            Assert.AreEqual(expected, actual);
        }

        [TestMethod]
        public void ValidateMissingLastName() 
        {
            var customer = new Customer
            {
                EmailAddress = "fbaggins@hobbiton.me"
            };

            bool expected = false;

            var actual = customer.Validate();

            Assert.AreEqual(expected, actual);
        }
    }
}