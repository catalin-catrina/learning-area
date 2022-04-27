using Microsoft.VisualStudio.TestTools.UnitTesting;
using MyClasses;
using System;
using System.IO;

namespace MyClassesTest
{
    [TestClass]
    public class FileProcessTest : TestBase
    {
        private const string BAD_FILE_NAME = @"C:\NotExists.bad";

        // ClassInitialize runs once per class, after the AssemblyInitialize method
        [ClassInitialize()]
        public static void ClassInitialize(TestContext tc)
        {
            // Initialize for all tests in class
            tc.WriteLine("In ClassInitialize() method");
        }

        // We don't have access to TestContext in ClassCleanup, only before initializing the test methods and inside them
        [ClassCleanup()]
        public static void ClassCleanup()
        {
            // Clean up after all tests in class
        }

        // TestInitialize() runs before each test method
        [TestInitialize()]
        public void TestInitialize()
        {
            TestContext.WriteLine("In TestInitialize() method");

            WriteDescription(this.GetType());

            if (TestContext.TestName.StartsWith("FileNameDoesExist"))
            {
                SetGoodFileName();

                if (!string.IsNullOrEmpty(_GoodFileName))
                {
                    TestContext.WriteLine("Creating file name: " + _GoodFileName);
                    // Create the "good" file
                    File.AppendAllText(_GoodFileName, "some text");
                }
            }
        }

        // TestCleanup() runs after each test method
        [TestCleanup()]
        public void TestCleanup()
        {
            TestContext.WriteLine("In TestCleanup() method");

            if (TestContext.TestName.StartsWith("FileNameDoesExist"))
            {
                // Delete file
                if (File.Exists(_GoodFileName))
                {
                    TestContext.WriteLine("Deleting file: " + _GoodFileName);
                    File.Delete(_GoodFileName);
                }
            }
        }

        [TestMethod] // [TestMethod] attribute indicates this is a test method and is mandatory for test methods
        [Description("Check to see if a file exists")] // The [Description] attribute allows to write a method to see the test description in test output
        // The [Owner], [Priority] and [TestCategory] attributes allows grouping tests by "Traits" 
        [Owner("CatalinC")] 
        [Priority(1)]
        [TestCategory("NoException")]
         //[Ignore] // ignore test
        public void FileNameDoesExist()
        {
            // Arrange - initialize variables we're going to need in the test method
            FileProcess fp = new FileProcess();
            bool fromCall;

            TestContext.WriteLine("Checking File " + _GoodFileName);
            // will print Checking File C:\Users\CatalinCatrina\AppData\Roaming\TestFile.txt in test output

            // Act - invoke method to test
            fromCall = fp.FileExists(_GoodFileName);

            // Assert - verify the act
            Assert.IsTrue(fromCall);
        }

        [TestMethod]
        [Description("Check if file does not exist")]
        [Owner("CatalinC")]
        [Priority(1)]
        [TestCategory("NoException")]
        public void FileNameDoesNotExist()
        {
            //Assert.Inconclusive();
            FileProcess fp = new();
            bool fromCall;

            TestContext.WriteLine("Checking File " + BAD_FILE_NAME);
            fromCall = fp.FileExists(BAD_FILE_NAME);

            Assert.IsFalse(fromCall);
        }

        // ExpectedException(typeof(ArgumentNullException)) means we're expecting an exception of ArgumentNullException type
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        [Description("Check of a thrown ArgumentNullException using ExpectedException")]
        [Owner("Mario")]
        [Priority(2)]
        [TestCategory("Exception")]
        public void FileNameNullOrEmpty_UsingAttribute()
        {
            //Assert.Inconclusive();
            FileProcess fp = new FileProcess();

            TestContext.WriteLine("Checking for a null file");

            fp.FileExists("");
        }

        [TestMethod]
        [Description("Check for a thrown ArgumentNullException using try...catch")]
        [Owner("Mario")]
        [Priority(3)]
        [TestCategory("Exception")]
        public void FileNameNullOrEmpty_UsingTryCatch()
        {
            //Assert.Inconclusive();
            FileProcess fp = new();

            try
            {
                TestContext.WriteLine("Test for a null file");
                fp.FileExists("");
            }
            catch (ArgumentNullException)
            {
                // Success
                return;
            }

            // Fail
            Assert.Fail("Call to FileExists() did NOT throw an ArgumentNullException");
        }

        [TestMethod]
        [Timeout(3000)] // fails the test if it takes more than 3000ms
        public void SimulateTimeout()
        {
            // making the test start running after 2000ms (so we can test the [Timeout] attribute)
            System.Threading.Thread.Sleep(2000);
        }

        // Parameters passed in the [DataRow] attribute will go in the AreNumbersEqual method's parameters
        // The test output will then be shown with the "title" set in the DisplayName parameter
        [TestMethod]
        [DataRow(1, 1, DisplayName = "First Test (1, 1)")]
        [DataRow(42, 42, DisplayName = "Second Test (42, 42)")]
        public void AreNumbersEqual(int num1, int num2)
        {
            Assert.AreEqual(num1, num2);
        }

        // Right click FileToDeploy.txt -> properties -> Copy to output directory: copy always
        // to make sure this file gets copied to the bin folder so that the test framework can pick it up and put it in the deployment directory
        // of the unit tests
        // [DeploymentItem] attribute basically says "go find the file to deploy and put it into the deployment directory of our tests
        [TestMethod]
        [DeploymentItem("FileToDeploy.txt")]
        [DataRow(@"C:\Windows\Regedit.exe", DisplayName = "Regedit.exe")]
        [DataRow("FileToDeploy.txt", DisplayName = "Deployment item: FileToDeploy.txt")]
        public void FileNameUsingDataRow(string fileName)
        {
            FileProcess fp = new FileProcess();
            bool fromCall;

            if (!fileName.Contains(@"\"))
            {
                fileName = TestContext.DeploymentDirectory + @"\" + fileName;
            }

            TestContext.WriteLine($"Checking file {fileName}");
            fromCall = fp.FileExists(fileName);
            Assert.IsTrue(fromCall);
        }
    }
}