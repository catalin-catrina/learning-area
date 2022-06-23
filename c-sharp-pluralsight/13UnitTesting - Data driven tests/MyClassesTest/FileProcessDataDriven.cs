using Microsoft.VisualStudio.TestTools.UnitTesting;
using MyClasses;
using System;
using System.Data;

namespace MyClassesTest
{
    /// <summary>
    /// To test in cmd: Tools -> Command Line -> Developer Command Prompt
    /// 
    /// Go to folder where the "csproj" file you want to test exists
    /// 
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings
    /// 
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --logger "console;verbosity=minimal"
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --logger "console;verbosity=normal"
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --logger "console;verbosity=detailed"
    /// 
    /// log files are created in a folder TestResults in the same directory as the csproj being tested
    /// 
    /// log results to a trx file (text results file) which we can open with visual studio and view the results there
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --logger "trx"
    /// 
    /// log results to html file
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --logger "html"
    /// 
    /// filter on matching names and only run selected test(s)
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --filter "Name=FileExistsFromDB"
    /// 
    /// combine filtering on names and logging to a file
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --filter "Name=FileExistsFromDB" --logger "html"
    /// 
    /// test methods that have a value anywhere in their name
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --filter "Name~File"
    /// 
    /// combine filtering on name conditions
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --filter "(Name=AreCollectionsEqual) | (IsCollectionOfTypeTest)"
    /// 
    /// filtering on attributes
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --filter "Priority=1"
    /// dotnet test MyClassesTest.csproj --settings MyClasses.runsettings --filter "TestCategory=NoException"
    /// </summary>

    [TestClass]
    public class FileProcessDataDriven : TestBase
    {
        private const string CONNECT_STRING = "Server = Localhost;Database=tests;";

        [TestMethod()]
        public void FileExistsFromDB()
        {
            FileProcess fp = new FileProcess();
            bool fromCall = false;
            bool testFailed = false;
            string fileName;
            bool expectedValue;
            bool causesException;
            string sql = "SELECT * FROM tests.FileProcessTest";
            string conn = CONNECT_STRING;

            // Load data from Mysql table
            LoadDataTable(sql, conn);

            if (TestDataTable != null)
            {
                // Loop through rows
                foreach (DataRow row in TestDataTable.Rows)
                {
                    // Get values from row
                    fileName = row["FileName"].ToString();
                    expectedValue = Convert.ToBoolean(row["ExpectedValue"]);
                    causesException = Convert.ToBoolean(row["CausesException"]);

                    try
                    {
                        // see if file exists
                        fromCall = fp.FileExists(fileName);
                    }
                    catch (ArgumentNullException)
                    {
                        // see if a null value was expected
                        if (!causesException)
                        {
                            testFailed = true;
                        }
                    }

                    catch (Exception)
                    {
                        testFailed = true;
                    }

                    TestContext.WriteLine($"Testing file: {fileName}, Expected value: {expectedValue}, Actual value: {fromCall}, Result: {(expectedValue == fromCall ? "Success" : "Failed")}");

                    // Check assertion
                    if (expectedValue != fromCall)
                    {
                        testFailed = true;
                    }
                }
                if (testFailed)
                {
                    Assert.Fail("Data driven tests have failed, check additional output for more information.");
                }
            }
        }
    }
}
