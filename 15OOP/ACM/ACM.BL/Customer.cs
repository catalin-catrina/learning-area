namespace ACM.BL
{
    // By default a class is private
    public class Customer
    {
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
                return LastName + "," + FirstName;
            }
        }
    }
}