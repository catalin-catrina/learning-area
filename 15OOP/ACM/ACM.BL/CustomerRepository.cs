namespace ACM.BL
{
    public class CustomerRepository
    {
        // Whenever we initialize a CustomerRepository object, the constructor will build an instance of the AddressRepository class
        // This establishes a collaborative relationship between the two classes
        public CustomerRepository() 
        {
            _addressRepository = new AddressRepository();   
        }

        private AddressRepository _addressRepository { get; set; }

        public Customer Retrieve(int customerId)
        {
            // In terms of relationship between classes: this is called "collaboration" (use a), because CustomerRepository uses an instance of another unrelated class (Customer) - CustomerRepository uses Customer
            Customer customer = new Customer(customerId);

            if (customerId == 1)
            {
                customer.EmailAddress = "fbaggins@hobbiton.me";
                customer.FirstName = "Frodo";
                customer.LastName = "Baggins";

                // we call ToList() on the returned IEnumerable to return the result as a list
                customer.AddressList = _addressRepository.RetrieveByCustomerId(customerId).ToList();
            }

            return customer;
        }

        public bool Save()
        {
            return true;
        }
    }
}
