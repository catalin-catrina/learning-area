using System.Collections.Generic;

namespace LINQSamples
{
  public partial class ProductRepository
  {
    #region GetAll Method
    public static List<Product> GetAll()
    {
      return new List<Product>
      {
        new Product {
          Name = "Sport-100 Helmet",
          Color = "Red"
        },
        new Product {
          Name = "Road Frame",
          Color = "Black",
        },        
        new Product {
          Name = "Long Sleeve Logo Jersey",
          Color = "Red"
        },
        new Product {
          Name = "Mountain Frame",
          Color = "Silver"
        }
      };
    }
    #endregion
  }
}