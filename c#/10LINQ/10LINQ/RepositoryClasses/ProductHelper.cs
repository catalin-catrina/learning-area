using _10LINQ.EntityClasses;

namespace _10LINQ.RepositoryClasses
{
    public static class ProductHelper
    {
        // The IEnumerable<T> interface is what all LINQ queries return. You are allowed to add any LINQ expression to this type
        // the first parameter in an extension method must always be prefixed with the "this" keyword
        // we use the "this" keyword to specify against what type this extension method can be applied
        // in our case we're applying this method to any IEnumrable<Product> objects
        public static IEnumerable<Product> ByColor(this IEnumerable<Product> query, string color)
        {
            return query.Where(prod => prod.Color == color);
        }
    }
}
