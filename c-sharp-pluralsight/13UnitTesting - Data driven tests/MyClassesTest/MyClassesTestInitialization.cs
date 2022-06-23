using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MyClassesTest
{
    [TestClass] // [TestClass] attribute
    public class MyClassesTestInitialization
    {
        [AssemblyInitialize()]
        public static void AssemblyInitialize(TestContext tc)
        {
            // Initialize for all tests within an assembly. Runs once before anything else
            tc.WriteLine("In AssemblyInitialize() method");
        }

        [AssemblyCleanup()]
        public static void AssemblyCleanup()
        {
            // Clean up after all tests in an assembly
        }
    }
}
