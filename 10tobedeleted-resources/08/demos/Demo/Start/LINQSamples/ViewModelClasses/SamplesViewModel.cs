using System;
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

    #region InnerJoin
    /// <summary>
    /// Join a Sales Order Detail collection with Products into anonymous class
    /// NOTE: This is an equijoin or an inner join
    /// </summary>
    public void InnerJoin()
    {
      StringBuilder sb = new StringBuilder(2048);
      short qty = 6;
      int count = 0;

      if (UseQuerySyntax) {
        // Query syntax
        

        //foreach (var item in query) {
        //  count++;
        //  sb.AppendLine($"Sales Order: {item.SalesOrderID}");
        //  sb.AppendLine($"  Product ID: {item.ProductID}");
        //  sb.AppendLine($"  Product Name: {item.Name}");
        //  sb.AppendLine($"  Size: {item.Size}");
        //  sb.AppendLine($"  Order Qty: {item.OrderQty}");
        //  sb.AppendLine($"  Total: {item.LineTotal:c}");
        //}
      }
      else {
        // Method syntax
        

        //foreach (var item in query) {
        //  count++;
        //  sb.AppendLine($"Sales Order: {item.SalesOrderID}");
        //  sb.AppendLine($"  Product ID: {item.ProductID}");
        //  sb.AppendLine($"  Product Name: {item.Name}");
        //  sb.AppendLine($"  Size: {item.Size}");
        //  sb.AppendLine($"  Order Qty: {item.OrderQty}");
        //  sb.AppendLine($"  Total: {item.LineTotal:c}");
        //}
      }

      ResultText = sb.ToString() + Environment.NewLine + "Total Sales: " + count.ToString();
    }
    #endregion

    #region InnerJoinTwoFields
    /// <summary>
    /// Join a Sales Order Detail collection with Products using two fields
    /// </summary>
    public void InnerJoinTwoFields()
    {
      int count = 0;

      StringBuilder sb = new StringBuilder(2048);

      if (UseQuerySyntax) {
        // Query syntax
        

        //foreach (var item in query) {
        //  count++;
        //  sb.AppendLine($"Sales Order: {item.SalesOrderID}");
        //  sb.AppendLine($"  Product ID: {item.ProductID}");
        //  sb.AppendLine($"  Product Name: {item.Name}");
        //  sb.AppendLine($"  Size: {item.Size}");
        //  sb.AppendLine($"  Order Qty: {item.OrderQty}");
        //  sb.AppendLine($"  Total: {item.LineTotal:c}");
        //}
      }
      else {
        // Method syntax
        

        //foreach (var item in query) {
        //  count++;
        //  sb.AppendLine($"Sales Order: {item.SalesOrderID}");
        //  sb.AppendLine($"  Product ID: {item.ProductID}");
        //  sb.AppendLine($"  Product Name: {item.Name}");
        //  sb.AppendLine($"  Size: {item.Size}");
        //  sb.AppendLine($"  Order Qty: {item.OrderQty}");
        //  sb.AppendLine($"  Total: {item.LineTotal:c}");
        //}
      }

      ResultText = sb.ToString() + Environment.NewLine + "Total Sales: " + count.ToString();
    }
    #endregion

    #region GroupJoin
    /// <summary>
    /// Use GroupJoin to create a new object with a Sales collection for each Product
    /// This is like a combination of an inner join and left outer join
    /// The 'into' keyword allows you to put the sales into a 'sales' variable 
    /// that can be used to retrieve all sales for a specific product
    /// </summary>
    public void GroupJoin()
    {
      StringBuilder sb = new StringBuilder(2048);
      IEnumerable<ProductSales> grouped = new List<ProductSales>();

      if (UseQuerySyntax) {
        // Query syntax is simply a 'join...into'
        
      }
      else {
        // Method syntax uses 'GroupJoin()'
        
      }

      // Loop through each product
      foreach (var ps in grouped) {
        sb.AppendLine($"Product: {ps.Product}");

        // Loop through the sales for this product
        if (ps.Sales.Count() > 0) {
          sb.AppendLine("   ** Sales **");
          foreach (var sale in ps.Sales) {
            sb.Append($"     SalesOrderID: {sale.SalesOrderID}");
            sb.Append($"     Qty: {sale.OrderQty}");
            sb.AppendLine($"     Total: {sale.LineTotal}");
          }
        }
        else {
          sb.AppendLine("   ** NO Sales for Product **");
        }
      }

      ResultText = sb.ToString();
    }
    #endregion

    #region LeftOuterJoin
    /// <summary>
    /// Perform a left join between Products and Sales using DefaultIfEmpty() and SelectMany()
    /// </summary>
    public void LeftOuterJoin()
    {
      StringBuilder sb = new StringBuilder(2048);
      int count = 0;

      if (UseQuerySyntax) {
        // Query syntax
        

        //foreach (var item in query) {
        //  count++;
        //  sb.AppendLine($"Product Name: {item.Name} ({item.ProductID})");
        //  sb.AppendLine($"  Order ID: {item.SalesOrderID}");
        //  sb.AppendLine($"  Size: {item.Size}");
        //  sb.AppendLine($"  Order Qty: {item.OrderQty}");
        //  sb.AppendLine($"  Total: {item.LineTotal:c}");
        //}
      }
      else {
        // Method syntax
        

        //foreach (var item in query) {
        //  count++;
        //  sb.AppendLine($"Product Name: {item.Name} ({item.ProductID})");
        //  sb.AppendLine($"  Order ID: {item.SalesOrderID}");
        //  sb.AppendLine($"  Size: {item.Size}");
        //  sb.AppendLine($"  Order Qty: {item.OrderQty}");
        //  sb.AppendLine($"  Total: {item.LineTotal:c}");
        //}
      }

      ResultText = sb.ToString() + Environment.NewLine + "Total Sales: " + count.ToString();
    }
    #endregion
  }
}
