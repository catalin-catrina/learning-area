using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQSamples
{
  public class SamplesViewModel
  {
    #region Constructor
    public SamplesViewModel()
    {
      // Load all Product Data
      Products = ProductRepository.GetAll();
    }
    #endregion

    #region Properties
    public bool UseQuerySyntax { get; set; } = true;
    public List<Product> Products { get; set; }
    public string ResultText { get; set; }
    #endregion

    #region Any
    /// <summary>
    /// Use Any() to see if at least one item in a collection meets a specified condition
    /// </summary>
    public void Any()
    {
      string search = "z";
      bool value = true;

      if (UseQuerySyntax) {
        // Query Syntax

      }
      else {
        // Method Syntax

      }

      ResultText = $"Do any Name properties contain an '{search}'? {value}";

      // Clear List
      Products.Clear();
    }
    #endregion

    #region All
    /// <summary>
    /// Use All() to see if all items in a collection meet a specified condition
    /// </summary>
    public void All()
    {
      string search = " ";
      bool value = true;

      if (UseQuerySyntax) {
        // Query Syntax

      }
      else {
        // Method Syntax

      }

      ResultText = $"Do all Name properties contain a '{search}'? {value}";

      // Clear List
      Products.Clear();
    }
    #endregion

    #region LINQContains
    /// <summary>
    /// Use the LINQ Contains operator to see if a collection contains a specific value
    /// </summary>
    public void LINQContains()
    {
      bool value = true;
      List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

      if (UseQuerySyntax) {
        // Query Syntax

      }
      else {
        // Method Syntax

      }

      ResultText = $"Is the number in collection? {value}";

      // Clear List
      Products.Clear();
    }
    #endregion

    #region LINQContainsUsingComparer
    /// <summary>
    /// Use the LINQ Contains operator to see if a collection contains a specific object using an EqualityComparer class to perform the comparison
    /// </summary>
    public void LINQContainsUsingComparer()
    {
      int search = 744;
      bool value = true;
      ProductIdComparer pc = new ProductIdComparer();
      Product prodToFind = new Product { ProductID = search };

      if (UseQuerySyntax) {
        // Query Syntax

      }
      else {
        // Method Syntax

      }

      ResultText = $"Product ID: {search} is in Products Collection = {value}";

      // Clear List
      Products.Clear();
    }
    #endregion
  }
}
