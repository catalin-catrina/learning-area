namespace _10LINQ.EntityClasses
{
    // Comparer for module 7 - determine equality by comparing all properties
    public class ProductComparer : EqualityComparer<Product>
    {
        public override bool Equals(Product obj1, Product obj2)
        {
            return (obj1.ProductID == obj2.ProductID && obj1.Color == obj2.Color
                && obj1.Size == obj2.Size && obj1.ListPrice == obj2.ListPrice
                && obj1.Name == obj2.Name && obj1.StandardCost == obj2.StandardCost);
        }

        public override int GetHashCode(Product obj)
        {
            return obj.ProductID.GetHashCode();
        }
    }
}
