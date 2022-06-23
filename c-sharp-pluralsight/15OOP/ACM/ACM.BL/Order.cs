namespace ACM.BL
{
    public class Order
    {
        public Order () : this(0)
        {

        }
        public Order (int id)
        {
            OrderId = id;
            OrderItems = new List<OrderItem>();
        }

        public int OrderId { get; set; }

        // DateTimeOffset type keeps track of date, time and time zone offset. Good for when date can be set in different timezones
        // allows to correctly compare dates from different timezones (10AM in Detroit =/= 10AM in Paris
        // ? = nullable type; it can hold the value of DateTimeOffset or null
        // ? is good for date types as there is no good default value
        public DateTimeOffset? OrderDate { get; set; }

        public int CustomerType { get; set; }

        // Composition relationship between Order class and the Customer and Address classes using IDs
        // There are several advantages to using id properties instead of object properties to establish relationships between classes
        // It reduces coupling because the class (Order) no longer has a direct reference to its related classes (Customer and Address)
        // It's more efficient because OrderRepository does not have to load Customer and Address each time it loads an Order
        public int CustomerId { get; set; }
        public int ShippingAddressId { get; set; }

        // here we define the composition relationship between Order and OrderItem using references by defining a list of order items
        public List<OrderItem> OrderItems { get; set; }

        public bool Validate()
        {
            bool isValid = true;
            if (OrderDate == null) isValid = false;
            return isValid;
        }
    }
}
