using _13UnitTesting.PersonClassses;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace MyClassesTest
{
    [TestClass]
    public class CollectionAssertClassTest : TestBase
    {
        [TestMethod]
        public void AreCollectionsEqual()
        {
            PersonManager mgr = new PersonManager();
            List<Person> peopleExpected = new List<Person>();
            List<Person> peopleActual = new List<Person>();

            peopleActual = mgr.GetPeople();
            peopleExpected = peopleActual;

            // NOTE: by default it compares the person objects to see if they are pointing to the same objects
            CollectionAssert.AreEqual(peopleExpected, peopleActual);
        }

        [TestMethod]
        public void IsCollectionOfTypeTest()
        {
            PersonManager mgr = new PersonManager();
            List<Person> peopleActual = new List<Person>();

            peopleActual = mgr.GetSupervisors();

            CollectionAssert.AllItemsAreInstancesOfType(peopleActual, typeof(Supervisor));
        }
    }
}
