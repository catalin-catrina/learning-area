using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace MyClassesTest
{
    public class TestBase
    {
        protected string _GoodFileName;

        // You should always have a property named TestContext of type TestContext in all test classes
        public TestContext TestContext { get; set; }

        // The TestContext properties collection is set automatically from all the parameters in your runsettings file
        // We adding a parameter in the runsettings file called "GoodFileName" and we assign it to the _GoodFileName variable 
        // if it contains [AppPath] we replace [AppPath] with what we get back from Environment.GetFolderPath using the SpecialFolder.ApplicationData
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
