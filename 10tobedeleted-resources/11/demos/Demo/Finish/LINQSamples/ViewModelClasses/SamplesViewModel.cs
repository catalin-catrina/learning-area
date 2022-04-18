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

    const string COLOR = "Red";

    #region DeferredExecution
    /// <summary>
    /// Illustrate the concept of LINQ deferred execution
    /// </summary>
    public void DeferredExecution()
    {
      IEnumerable<Product> query;

      System.Diagnostics.Debugger.Break();

      // Create LINQ query
      // Add .ToList() to see immediate execution
      query = Products.Where(prod => prod.Color == COLOR);

      Console.WriteLine("");

      // Query is executed here
      foreach (Product product in query) {
        Console.WriteLine(product);
      }

      // The following code is equivalent to the foreach()
      //IEnumerator<Product> enumerator = query.GetEnumerator();
      //while (enumerator.MoveNext()) {
      //  Console.WriteLine(enumerator.Current);
      //}
    }
    #endregion

    #region FilterUsingSimpleGenericFilter
    /// <summary>
    /// Create a generic filter to illustrate how NOT to write a filter
    /// </summary>
    public void FilterUsingSimpleGenericFilter()
    {
      IEnumerable<Product> query;

      System.Diagnostics.Debugger.Break();

      // Create LINQ query
      query = Products.FilterSimple(prod => prod.Color == COLOR);

      Console.WriteLine("");
      foreach (Product product in query) {
        Console.WriteLine(product);
      }
    }
    #endregion

    #region FilterUsingWhereTake
    /// <summary>
    /// Use the Where() expression with Take(1) and you see very different results from using the simple generic filter
    /// </summary>
    public void FilterUsingWhereTake()
    {
      IEnumerable<Product> query;

      System.Diagnostics.Debugger.Break();

      // Create LINQ query
      query = Products.Where(prod => prod.Color == COLOR).Take(1);

      Console.WriteLine("");
      foreach (Product product in query) {
        Console.WriteLine(product);
      }
    }
    #endregion

    #region FilterUsingSimpleGenericFilterTake
    /// <summary>
    /// Add Take(1) to simple generic filter and compare to using Where() and Take(1)
    /// </summary>
    public void FilterUsingSimpleGenericFilterTake()
    {
      IEnumerable<Product> query;

      System.Diagnostics.Debugger.Break();

      // Create LINQ query
      query = Products.FilterSimple(prod => prod.Color == COLOR).Take(1);

      Console.WriteLine("");
      foreach (Product product in query) {
        Console.WriteLine(product);
      }
    }
    #endregion

    #region UsingYield
    /// <summary>
    /// The correct way to write a generic filter is to use the 'yield' keyword
    /// </summary>
    public void UsingYield()
    {
      IEnumerable<Product> query;

      System.Diagnostics.Debugger.Break();

      // Create LINQ query
      query = Products.Filter(prod => prod.Color == COLOR);

      Console.WriteLine("");
      foreach (Product product in query) {
        Console.WriteLine(product);
      }
    }
    #endregion

    #region UsingYieldAndTake
    /// <summary>
    /// Apply the Take(1) expression to your custom filter using 'yield'
    /// </summary>
    public void UsingYieldAndTake()
    {
      IEnumerable<Product> query;

      System.Diagnostics.Debugger.Break();

      // Create LINQ query
      query = Products.Filter(prod => prod.Color == COLOR).Take(1);

      Console.WriteLine("");
      foreach (Product product in query) {
        Console.WriteLine(product);
      }
    }
    #endregion

    #region UsingOrderBy
    /// <summary>
    /// Adding the OrderBy() forces one complete iteration through collection to sort the data before the filtering can happen
    /// </summary>
    public void UsingOrderBy()
    {
      IEnumerable<Product> query;

      // Create LINQ query
      query = Products.Filter(prod => prod.Color == COLOR)
                      .OrderBy(prod => prod.Name);

      // Using .Where() produces the same result
      // query = Products.Where(prod => prod.Color == search)
      //                 .OrderBy(prod => prod.Name);

      Console.WriteLine("");
      foreach (Product product in query) {
        Console.WriteLine(product);
      }
    }
    #endregion
  }
}
