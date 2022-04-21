using _10LINQ.EntityClasses;

namespace _10LINQ.RepositoryClasses
{
    public class ProductRepositoryLastModule
    {
        public static List<ProductLastModule> GetAll()
        {
            return new List<ProductLastModule>
            {
                new ProductLastModule {Name = "Sport-100 Helmet", Color = "Red"},
                new ProductLastModule {Name = "Road Frame", Color = "Black"},
                new ProductLastModule {Name = "Long Sleeve Jersey", Color = "Red"},
                new ProductLastModule {Name = "Mountain Frame", Color = "Silver"}
            };
        }
    }
}
