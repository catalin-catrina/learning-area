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
  }
}
