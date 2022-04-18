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
    /// </summary>
    public void GroupBy()
    {
      StringBuilder sb = new StringBuilder(2048);
      IEnumerable<IGrouping<string, Product>> sizeGroup = null;

      if (UseQuerySyntax) {
        // Query syntax
        
      }
      else {
        // Method syntax
        
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
    /// </summary>
    public void GroupByIntoSelect()
    {
      StringBuilder sb = new StringBuilder(2048);
      IEnumerable<IGrouping<string, Product>> sizeGroup = null;

      if (UseQuerySyntax) {
        // Query syntax
        
      }
      else {
        // Method syntax
        
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
      IEnumerable<IGrouping<string, Product>> sizeGroup = null;

      if (UseQuerySyntax) {
        // Query syntax

      }
      else {
        // Method syntax

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
      IEnumerable<IGrouping<string, Product>> sizeGroup = null;

      if (UseQuerySyntax) {
        // Query syntax
       
      }
      else {
        // Method syntax
        
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
      IEnumerable<SaleProducts> salesGroup = null;

      // Get all products for a sales order id
      if (UseQuerySyntax) {
        // Query syntax
       
      }
      else {
        // Method syntax
       
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
  }
}
