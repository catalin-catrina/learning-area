namespace _10LINQ.EntityClasses
{
    // Comparer for module 6 - determine equality if productIDs are equal
    public class ProductIdComparer : EqualityComparer<Product>
    {
        public override bool Equals(Product x, Product y)
        {
            return (x.ProductID == y.ProductID);
        }

        public override int GetHashCode(Product obj)
        {
            return obj.ProductID.GetHashCode();
        }
    }
}
