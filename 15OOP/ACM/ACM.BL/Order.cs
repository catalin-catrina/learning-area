namespace ACM.BL
{
    public class Order
    {
        public Order ()
        {

        }
        public Order (int id)
        {
            OrderId = id;
        }

        public int OrderId { get; set; }

        // DateTimeOffset type keeps track of date, time and time zone offset. Good for when date can be set in different timezones
        // allows to correctly compare dates from different timezones (10AM in Detroit =/= 10AM in Paris
        // ? = nullable type; it can hold the value of DateTimeOffset or null
        // ? is good for date types as there is no good default value
        public DateTimeOffset? OrderDate { get; set; }
        public bool Validate()
        {
            bool isValid = true;
            if (OrderDate == null) isValid = false;
            return isValid;
        }
    }
}
