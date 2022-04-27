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

            SetGoodFileName();

            if (!string.IsNullOrEmpty(_GoodFileName))
            {
                TestContext.WriteLine("Creating file name: " + _GoodFileName);
                // Create the "good" file
                File.AppendAllText(_GoodFileName, "some text");
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
        public void AssertIsTrueAndIsFalse()
        {
            FileProcess fp = new();
            bool fromCall;

            fromCall = fp.FileExists(_GoodFileName);

            // We can pass a string second parameter to Assert.IsTrue and Assert.IsFalse which will print in output in case test fails
            Assert.IsTrue(fromCall, "File " + _GoodFileName + " does not exist");
        }

        [TestMethod]
        public void AssertAreEqualTwoParams()
        {
            string str1 = "Cata";
            string str2 = "Cata";

            // compares strings case sensitive
            Assert.AreEqual(str1, str2);
        }

        [TestMethod]
        public void AssertAreEqualThreeParams()
        {
            string str1 = "Cata";
            string str2 = "cata";

            // compares strings case insensitive
            Assert.AreEqual(str1, str2, true);
        }

        [TestMethod]
        public void AssertAreNotEqual()
        {
            string str1 = "Cata";
            string str2 = "Someone else";

            Assert.AreNotEqual(str1, str2);
        }

        [TestMethod]
        public void AssertAreSame()
        {
            FileProcess x = new();
            FileProcess y = x;

            // returns true if references of two objects are the same
            Assert.AreSame(x, y);
        }

        [TestMethod]
        public void AssertAreNotSame()
        {
            FileProcess x = new();
            FileProcess y = new();

            // returns true if references of two objects are not the same
            Assert.AreNotSame(x, y);
        }
    }
}