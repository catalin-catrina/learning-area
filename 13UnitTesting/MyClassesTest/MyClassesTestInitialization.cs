using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MyClassesTest
{
    [TestClass] // [TestClass] attribute
    public class MyClassesTestInitialization
    {
        [AssemblyInitialize()]
        public static void AssemblyInitialize(TestContext tc)
        {
            // Initialize for all tests within an assembly
            // Here you'd normally create a database, create some tables in a db, add test data, create test files
            // Basically anything you need to do BEFORE all the other tests within this assembly run
            // It only runs once (can be seen in the first method test output) for the entire assembly
            tc.WriteLine("In AssemblyInitialize() method");
        }

        [AssemblyCleanup()]
        public static void AssemblyCleanup()
        {
            // Clean up after all tests in an assembly
        }
    }
}
