using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Reflection;
using System.Data;
using MySql.Data.MySqlClient;

namespace MyClassesTest
{
    public class TestBase
    {
        public DataTable TestDataTable { get; set; }

        public DataTable LoadDataTable(string sql, string connection)
        {
            TestDataTable = null;
            try
            {
                // Create a connection
                using (MySqlConnection ConnectionObject = new MySqlConnection(connection))
                {
                    // Create command object
                    using (MySqlCommand CommandObject = new MySqlCommand(sql, ConnectionObject))
                    {
                        // Create data adapter
                        using (MySqlDataAdapter da = new MySqlDataAdapter(CommandObject))
                        {
                            // Fill datatable using data adapter
                            TestDataTable = new DataTable();
                            da.Fill(TestDataTable);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                TestContext.WriteLine("Error in LoadDataTable() method" + Environment.NewLine + ex.Message);
            }

            return TestDataTable;
        }

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
