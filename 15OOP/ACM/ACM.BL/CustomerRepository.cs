namespace ACM.BL
{
    public class CustomerRepository
    {
        public Customer Retrieve(int customerId)
        {
            // In terms of relationship between classes: this is called "collaboration" (use a), because CustomerRepository uses an instance of another unrelated class (Customer) - CustomerRepository uses Customer
            Customer customer = new Customer(customerId);

            if (customerId == 1)
            {
                customer.EmailAddress = "fbaggins@hobbiton.me";
                customer.FirstName = "Frodo";
                customer.LastName = "Baggins";
            }

            return customer;
        }

        public bool Save()
        {
            return true;
        }
    }
}
