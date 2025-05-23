﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text.RegularExpressions;

namespace MyClassesTest
{
    [TestClass]
    public class StringAssertClassTest : TestBase
    {
        [TestMethod]
        public void ContainsTest()
        {
            string str1 = "Steve Nystrom";
            string str2 = "Nystrom";

            // checks if a string is contained within another string
            StringAssert.Contains(str1, str2);
        }

        [TestMethod]
        public void StartsWith()
        {
            string str1 = "ALL Lower Case";
            string str2 = "ALL Lower";

            StringAssert.StartsWith(str1, str2);
        }

        [TestMethod]
        public void IsAllLowerCaseTest()
        {
            Regex r = new Regex(@"^([^A-Z])+$");

            StringAssert.Matches("all lower case", r);
        }

        [TestMethod]
        public void IsNotAllLowerCaseTest()
        {
            Regex r = new Regex(@"^([^A-Z])+$");

            StringAssert.DoesNotMatch("All Lower Case", r);
        }
    }
}
