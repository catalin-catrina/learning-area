using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LINQSamples
{
  public class SamplesViewModel
  {
    #region Constructor
    public SamplesViewModel()
    {
      // Load all Product Data
      Products = ProductRepository.GetAll();
      // Load all Sales Data
      Sales = SalesOrderDetailRepository.GetAll();
    }
    #endregion

    #region Properties
    public bool UseQuerySyntax { get; set; } = true;
    public List<Product> Products { get; set; }
    public List<SalesOrderDetail> Sales { get; set; }
    public string ResultText { get; set; }
    #endregion

    #region GroupBy
    /// <summary>
    /// Group products by Size property
    /// orderby is optional
    /// </summary>
    public void GroupBy()
    {
      StringBuilder sb = new StringBuilder(2048);
      IEnumerable<IGrouping<string, Product>> sizeGroup;

      if (UseQuerySyntax) {
        // Query syntax
        sizeGroup = (from prod in Products
                     orderby prod.Size
                     group prod by prod.Size);
      }
      else {
        // Method syntax
        sizeGroup = Products.OrderBy(prod => prod.Size)
                            .GroupBy(prod => prod.Size);
      }

      // Loop through each size
      foreach (var group in sizeGroup) {
        // The value in the 'Key' property is 
        // whatever data you grouped upon
        sb.AppendLine($"Size: {group.Key}  Count: {group.Count()}");

        // Loop through the products in each size
        foreach (var prod in group) {
          sb.Append($"  ProductID: {prod.ProductID}");
          sb.Append($"  Name: {prod.Name}");
          sb.AppendLine($"  Color: {prod.Color}");
        }
      }

      ResultText = sb.ToString();
    }
    #endregion

    #region GroupByIntoSelect
    /// <summary>
    /// Group products by Size property using 'into' and 'select'
    /// orderby is optional
    /// </summary>
    public void GroupByIntoSelect()
    {
      StringBuilder sb = new StringBuilder(2048);
      IEnumerable<IGrouping<string, Product>> sizeGroup;

      if (UseQuerySyntax) {
        // Query syntax
        sizeGroup = (from prod in Products
                     orderby prod.Size
                     group prod by prod.Size into sizes
                     select sizes);
      }
      else {
        // Method syntax
        sizeGroup = Products.OrderBy(prod => prod.Size)
                            .GroupBy(prod => prod.Size);
      }

      // Loop through each size
      foreach (var group in sizeGroup) {
        // The value in the 'Key' property is 
        // whatever data you grouped upon
        sb.AppendLine($"Size: {group.Key}  Count: {group.Count()}");

        // Loop through the products in each size
        foreach (var prod in group) {
          sb.Append($"  ProductID: {prod.ProductID}");
          sb.Append($"  Name: {prod.Name}");
          sb.AppendLine($"  Color: {prod.Color}");
        }
      }

      ResultText = sb.ToString();
    }
    #endregion

    #region GroupByOrderByKey
    /// <summary>
    /// Group products by Size property and sort by Size using the Key property
    /// </summary>
    public void GroupByOrderByKey()
    {
      StringBuilder sb = new StringBuilder(2048);
      IEnumerable<IGrouping<string, Product>> sizeGroup;

      if (UseQuerySyntax) {
        // Query syntax
        sizeGroup = (from prod in Products
                     group prod by prod.Size into sizes
                     orderby sizes.Key
                     select sizes);
      }
      else {
        // Method syntax
        sizeGroup = Products.GroupBy(prod => prod.Size)
                            .OrderBy(sizes => sizes.Key)
                            .Select(sizes => sizes);
      }

      // Loop through each size
      foreach (var group in sizeGroup) {
        // The value in the 'Key' property is 
        // whatever data you grouped upon
        sb.AppendLine($"Size: {group.Key}  Count: {group.Count()}");

        // Loop through the products in each size
        foreach (var prod in group) {
          sb.Append($"  ProductID: {prod.ProductID}");
          sb.Append($"  Name: {prod.Name}");
          sb.AppendLine($"  Color: {prod.Color}");
        }
      }

      ResultText = sb.ToString();
    }
    #endregion

    #region GroupByWhere
    /// <summary>
    /// Group products by Size property and the group has more than 2 members
    /// This simulates a HAVING clause in SQL
    /// </summary>
    public void GroupByWhere()
    {
      StringBuilder sb = new StringBuilder(2048);
      IEnumerable<IGrouping<string, Product>> sizeGroup;

      if (UseQuerySyntax) {
        // Query syntax
        sizeGroup = (from prod in Products
                     group prod by prod.Size into sizes
                     where sizes.Count() > 2
                     select sizes);
      }
      else {
        // Method syntax
        sizeGroup = Products.GroupBy(prod => prod.Size)
                            .Where(sizes => sizes.Count() > 2)
                            .Select(sizes => sizes);
      }

      // Loop through each size
      foreach (var group in sizeGroup) {
        // The value in the 'Key' property is 
        // whatever data you grouped upon
        sb.AppendLine($"Size: {group.Key}  Count: {group.Count()}");

        // Loop through the products in each size
        foreach (var prod in group) {
          sb.Append($"  ProductID: {prod.ProductID}");
          sb.Append($"  Name: {prod.Name}");
          sb.AppendLine($"  Color: {prod.Color}");
        }
      }

      ResultText = sb.ToString();
    }
    #endregion

    #region GroupedSubquery
    /// <summary>
    /// Group Sales by SalesOrderID, add Products into new Sales Order object using a subquery
    /// </summary>
    public void GroupedSubquery()
    {
      StringBuilder sb = new StringBuilder(2048);
      IEnumerable<SaleProducts> salesGroup;

      // Get all products for a sales order id
      if (UseQuerySyntax) {
        // Query syntax
        salesGroup = (from sale in Sales
                      group sale by sale.SalesOrderID into sales
                      select new SaleProducts
                      {
                        SalesOrderID = sales.Key,
                        Products = (from prod in Products
                                    join sale in Sales on prod.ProductID equals sale.ProductID
                                    where sale.SalesOrderID == sales.Key
                                    select prod).ToList()
                      });
      }
      else {
        // Method syntax
        salesGroup =
          Sales.GroupBy(sale => sale.SalesOrderID)
                .Select(sales => new SaleProducts
                {
                  SalesOrderID = sales.Key,
                  Products = Products.Join(sales,
                                          prod => prod.ProductID,
                                          sale => sale.ProductID,
                                          (prod, sale) => prod).ToList()
                });
      }

      // Loop through each sales order
      foreach (var sale in salesGroup) {
        sb.AppendLine($"Sales ID: {sale.SalesOrderID}");

        if (sale.Products.Count > 0) {
          // Loop through the products in each sale
          foreach (var prod in sale.Products) {
            sb.Append($"  ProductID: {prod.ProductID}");
            sb.Append($"  Name: {prod.Name}");
            sb.AppendLine($"  Color: {prod.Color}");
          }
        }
        else {
          sb.AppendLine("   Product ID not found for this sale.");
        }
      }

      ResultText = sb.ToString();
    }
    #endregion

    #region DistinctUsingGroupByFirstOrDefault
    /// <summary>
    /// The Distinct() operator can be simulated using the GroupBy() and FirstOrDefault() operators
    /// In this sample you put distinct product colors into another collection using LINQ
    /// </summary>
    public void DistinctUsingGroupByFirstOrDefault()
    {
      List<string> colors;

      if (UseQuerySyntax) {
        // Query Syntax
        colors = (from prod in Products
                  group prod by prod.Color into groupedColors
                  select groupedColors.FirstOrDefault().Color).ToList();
      }
      else {
        // Method Syntax
        colors = Products.GroupBy(p => p.Color)
                         .Select(groupedColors =>
                                 groupedColors.FirstOrDefault().Color).ToList();
      }

      // Build string of Distinct Colors
      foreach (var color in colors) {
        Console.WriteLine($"Color: {color}");
      }
      Console.WriteLine($"Total Colors: {colors.Count}");

      // Clear products
      Products.Clear();
    }
    #endregion
  }
}
