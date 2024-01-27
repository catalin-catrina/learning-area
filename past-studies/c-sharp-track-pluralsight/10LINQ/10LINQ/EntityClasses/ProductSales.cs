using _10LINQ.ViewModelClasses;

namespace _10LINQ.EntityClasses
{
    public class ProductSales
    {
        // Here we define our one-to-many relationship (one product has many sales)
        public Product Product { get; set; }
        public IEnumerable<SalesOrderDetail> Sales { get; set; }
    }
}
