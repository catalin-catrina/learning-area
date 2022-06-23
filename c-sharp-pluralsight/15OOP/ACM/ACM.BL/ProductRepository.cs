namespace ACM.BL
{
    public class ProductRepository
    {
        public Product Retrieve(int productId)
        {
            Product prod = new Product(productId);

            if (productId == 2)
            {
                prod.ProductName = "Sunflowers";
                prod.ProductDescription = "lorem ipsum";
                prod.CurrentPrice = 15.96M;
            }

            return prod;
        }

        public bool Save()
        {
            return true;
        }
    }
}
