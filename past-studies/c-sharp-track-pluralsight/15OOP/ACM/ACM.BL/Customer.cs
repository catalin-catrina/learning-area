// Most applications today are divided into at least three layers:
    // User interface - for the forms and pages displayed to the user
    // Business logic - for the business operations
    // Data access - for retrieving and storing data
    // Common library - many apps have a common library for general purpose code useful throughout the app
        // this can include code for logging, sending email and other common tasks accross the entities

// The classes we identified are for the business logic, so we created the business logic component (BL)
// In Visual Studio we created a solution for the application and a project for the business logic component

// The proeprties and methods declared with the public access modifier comprise the class contract / interface

namespace ACM.BL
{
    // By default a class is private
    public class Customer
    {
        // in c#, the properties of the object default to valid values so there is no need to initialize them in the constructor
        // parameterless constructor is the default constructor
        //public Customer()
        //{

        //}

        // constructor chaining. calling the other constructor with an id of 0 when the default constructor is called
        public Customer() : this(0)
        {

        }

        // overloading the default constructor. if we plan to overload the constructor, we need to explicitly define the default constructor first
        // since the CustomerId proeprty has a private setter, it cannot be set from outside the Customer class
        // so lets allow setting the CustomerId with a constructor
        public Customer(int id)
        {
            CustomerId = id;
            AddressList = new List<Address>();
        }

        // Auto-implemented property
        // If there is no need for logic within the getter and setter you can use the auto-implemented property
        public string FirstName { get; set; }

        // private - no code outside this class can access this field
        // everytime we define a property declare a private variable to hold the value
        // this private variable is called the "Backing Field"
        // then add a property with get and set accessors
        private string _lastName;

        // the data is accessible for other parts of the app through a c# property
        // c# properties are typical defined using the "public" access modifier
        // another common modifier is "internal", which means the property is only available for this project of the solution (ACM.BL)
        public string LastName
        {
            // the get accessor gets the property value
            // we can add validation in the getter or perform other operations
            // a property without a getter is a write-only property
            get { return _lastName; }
            // the setter sets the property value
            // we can also add validation in the setter or perform other operations
            // a property without a setter is a read-only property
            set { _lastName = value; }
        }

        // snippets are an easy way of adding properties
        // right click -> snippet -> insert snippet and choose the snippet you want to insert
        // or memorize the shortcut. for example to add an auto-implemented property we use "prop"
        public string EmailAddress { get; set; }

        // snippet for an auto-implemented property with a private setter is "propg"
        // any caller can get CustomerId, but only this class can set it
        public int CustomerId { get; private set; }

        public string FullName
        {
            get
            {
                string fullName = LastName;
                if (!string.IsNullOrWhiteSpace(FirstName))
                {
                    if (!string.IsNullOrWhiteSpace(fullName))
                    {
                        fullName += ", ";
                    } 
                    fullName += FirstName;
                }
                return fullName;
            }
        }

        // using the static modifier on a class member denotes that the member belongs to the class itself rather than any specific instance
        public static int InstanceCount { get; set; }

        // We could add two properties to the Customer class, each of type Address
        //public Address WorkAddress { get; set; }
        //public Address HomeAddress { get; set; }

        // Alternatively, we can create a List of addresses that more easily allows for any number of related addresses
        // Composition relationship (has a relationship) between the Customer and Address classes - established by a property
        // we need to initialize the list in the constructor because lists don't have a good default value, if we don't initialize Lists in the constructor we will get a null value exception
        public List<Address> AddressList { get; set; }

        public bool Validate()
        {
            var isValid = true;

            if (string.IsNullOrWhiteSpace(EmailAddress)) isValid = false;
            if (string.IsNullOrWhiteSpace(LastName)) isValid = false;

            return isValid;
        }
    }
}