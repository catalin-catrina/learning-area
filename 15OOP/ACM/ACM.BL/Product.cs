namespace ACM.BL
{
    public class Product
    {
        public Product ()
        {

        }

        public Product (int id)
        {
            ProductId = id;
        }

        public int ProductId { get; private set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }

        // ? = nullable type
        // a nullable type is a value type such as int or decimal that allows definition of the value or a null
        // it is useful if the code needs to distinguish between "not set" and 0
        // in this case the price of 0 is a valid price, but its not valid to have no price, using a nullable value makes that distinction
        public decimal? CurrentPrice { get; set; }
        public bool Validate()
        {
            bool isValid = true;
            if (string.IsNullOrWhiteSpace(ProductName) || string.IsNullOrWhiteSpace(ProductDescription)) isValid = false;
            if (CurrentPrice == null) isValid = false;
            return isValid;
        }
    }
}
