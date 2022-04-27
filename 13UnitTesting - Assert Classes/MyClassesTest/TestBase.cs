using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Reflection;

namespace MyClassesTest
{
    public class TestBase
    {
        protected string _GoodFileName;

        public TestContext TestContext { get; set; }

        // Write [Description] attribute in the test output
        protected void WriteDescription(Type typ)
        {
            // TestName property grabs the name of the test method currently executing
            string testName = TestContext.TestName;

            // Find the test method currently executing
            MemberInfo method = typ.GetMethod(testName);
            if (method != null)
            {
                // See if the [Description] attribute exists on this test
                Attribute attr = method.GetCustomAttribute(typeof(DescriptionAttribute));
                if (attr != null)
                {
                    // Cast the attribute to a DescriptionAttribute
                    DescriptionAttribute dattr = (DescriptionAttribute)attr;
                    // Display the test description
                    TestContext.WriteLine("Test description: " + dattr.Description);
                }
            }
        }

        protected void SetGoodFileName()
        {
            _GoodFileName = TestContext.Properties["GoodFileName"].ToString();
            if (_GoodFileName.Contains("[AppPath]"))
            {
                _GoodFileName = _GoodFileName.Replace("[AppPath]", Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData));
                // C:\Users\CatalinCatrina\AppData\Roaming\TestFile.txt
            }
        }
    }
}
