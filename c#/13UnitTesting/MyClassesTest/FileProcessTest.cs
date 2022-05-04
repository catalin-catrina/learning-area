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

        // ClassInitialize runs once per class, after the AssemblyInitialize method, and its output can be seen in the first test method ran
        // Make sure to add the ClassInitialize attribute before the ClassInitialize class
        // This tells the unit test framework that this is the method to run before all the other test methods within here are run
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

        [TestMethod]
        public void FileNameDoesExist()
        {
            // By default all tests pass, but using Assert.Inconclusive() we give ourselves a clue that we haven't written these tests yet
            // So they are "Inconclusive" whether they succeed or fail
            //Assert.Inconclusive();

            // Arrange - initialize variables we're going to need in the test method
            FileProcess fp = new FileProcess();
            bool fromCall;

            // Can comment these out because we set it in the TestInitialize method which runs before all tests
            //// get a file name
            //SetGoodFileName();

            //// create the file
            //if (!string.IsNullOrEmpty(_GoodFileName))
            //{
            //    // Create the "good" file by adding some text to it
            //    File.AppendAllText(_GoodFileName, "some text content");
            //}

            // We can use TestContext to write into the output of the test
            TestContext.WriteLine("Checking File " + _GoodFileName);
            // will print Checking File C:\Users\CatalinCatrina\AppData\Roaming\TestFile.txt in test output

            // Act - invoke method to test
            fromCall = fp.FileExists(_GoodFileName);

            // Can comment these out too because we did it in TestCleanup() method which runs after all tests
            //// delete file
            //if (File.Exists(_GoodFileName))
            //{
            //    File.Delete(_GoodFileName);
            //}

            // Assert - verify the act
            Assert.IsTrue(fromCall);
        }

        [TestMethod]
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
        public void FileNameNullOrEmpty_UsingAttribute()
        {
            //Assert.Inconclusive();
            FileProcess fp = new FileProcess();

            TestContext.WriteLine("Checking for a null file");

            fp.FileExists("");
        }

        [TestMethod]
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
    }
}