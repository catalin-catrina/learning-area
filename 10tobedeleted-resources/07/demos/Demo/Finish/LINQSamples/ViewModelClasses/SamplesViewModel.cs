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

    #region SequenceEqualIntegers
    /// <summary>
    /// SequenceEqual() compares two different collections to see if they are equal
    /// When using simple data types such as int, string, a direct comparison between values is performed
    /// </summary>
    public void SequenceEqualIntegers()
    {
      bool value;
      // Create a list of numbers
      List<int> list1 = new List<int> { 5, 2, 3, 4, 5 };
      // Create a list of numbers
      List<int> list2 = new List<int> { 1, 2, 3, 4, 5 };

      if (UseQuerySyntax) {
        // Query Syntax
        value = (from num in list1
                 select num)
                  .SequenceEqual(list2);
      }
      else {
        // Method Syntax
        value = list1.SequenceEqual(list2);
      }

      if (value) {
        ResultText = "Lists are Equal";
      }
      else {
        ResultText = "Lists are NOT Equal";
      }

      // Clear List
      Products.Clear();
    }
    #endregion

    #region SequenceEqualProducts
    /// <summary>
    /// When using a collection of objects, SequenceEqual() performs a comparison to see if the two object references point to the same object
    /// </summary>
    public void SequenceEqualProducts()
    {
      bool value;
      // Create a list of products
      List<Product> list1 = new List<Product> {
        new Product {ProductID= 1, Name = "Product 1"},
        new Product {ProductID= 2, Name = "Product 2"},
      };
      // Create a list of products
      List<Product> list2 = new List<Product> {
        new Product {ProductID= 1, Name = "Product 1"},
        new Product {ProductID= 2, Name = "Product 2"},
      };

      if (UseQuerySyntax) {
        // Query Syntax
        value = (from prod in list1
                 select prod)
                 .SequenceEqual(list2);
      }
      else {
        // Method Syntax
        value = list1.SequenceEqual(list2);
      }

      if (value) {
        ResultText = "Lists are Equal";
      }
      else {
        ResultText = "Lists are NOT Equal";
      }

      // Clear List
      Products.Clear();
    }
    #endregion

    #region SequenceEqualUsingComparer
    /// <summary>
    /// Use an EqualityComparer class to determine if the objects are the same based on the values in properties
    /// </summary>
    public void SequenceEqualUsingComparer()
    {
      bool value;
      ProductComparer pc = new ProductComparer();
      // Load all Product Data
      List<Product> list1 = ProductRepository.GetAll();
      // Load all Product Data
      List<Product> list2 = ProductRepository.GetAll();

      // Remove an element from 'list1' to make the collections different
      //list1.RemoveAt(0);

      if (UseQuerySyntax) {
        // Query Syntax
        value = (from prod in list1
                 select prod)
                 .SequenceEqual(list2, pc);
      }
      else {
        // Method Syntax
        value = list1.SequenceEqual(list2, pc);
      }

      if (value) {
        ResultText = "Lists are Equal";
      }
      else {
        ResultText = "Lists are NOT Equal";
      }

      // Clear List
      Products.Clear();
    }
    #endregion

    #region ExceptIntegers
    /// <summary>
    /// Except() finds all values in one list that are not in the other list
    /// </summary>
    public void ExceptIntegers()
    {
      List<int> exceptions;
      // Create a list of numbers
      List<int> list1 = new List<int> { 1, 2, 3, 4 };
      // Create a list of numbers
      List<int> list2 = new List<int> { 3, 4, 5 };

      if (UseQuerySyntax) {
        // Query Syntax
        exceptions = (from num in list1
                      select num)
                      .Except(list2).ToList();
      }
      else {
        // Method Syntax
        exceptions = list1.Except(list2).ToList();
      }

      ResultText = string.Empty;
      foreach (var item in exceptions) {
        ResultText += "Number: " + item + Environment.NewLine;
      }

      // Clear List
      Products.Clear();
    }
    #endregion

    #region Except
    /// <summary>
    /// Except() finds all products in one list that are not in the other list using a comparer class
    /// </summary>
    public void Except()
    {
      ProductComparer pc = new ProductComparer();
      // Load all Product Data
      List<Product> list1 = ProductRepository.GetAll();
      // Load all Product Data
      List<Product> list2 = ProductRepository.GetAll();

      // Remove all products with color = "Black" from 'list2'
      // to give us a difference in the two lists
      list2.RemoveAll(prod => prod.Color == "Black");

      if (UseQuerySyntax) {
        // Query Syntax
        Products = (from prod in list1
                    select prod)
                    .Except(list2, pc).ToList();
      }
      else {
        // Method Syntax
        Products = list1.Except(list2, pc).ToList();
      }

      ResultText = $"Total Products: {Products.Count}";
    }
    #endregion

    #region Intersect
    /// <summary>
    /// Intersect() finds all products that are in common between two collections using a comparer class
    /// </summary>
    public void Intersect()
    {
      ProductComparer pc = new ProductComparer();
      // Load all Product Data
      List<Product> list1 = ProductRepository.GetAll();
      // Load all Product Data
      List<Product> list2 = ProductRepository.GetAll();

      // Remove 'black' products from 'list1'
      list1.RemoveAll(prod => prod.Color == "Black");
      // Remove 'red' products from 'list2'
      list2.RemoveAll(prod => prod.Color == "Red");

      if (UseQuerySyntax) {
        // Query Syntax
        Products = (from prod in list1
                    select prod)
                    .Intersect(list2, pc).ToList();
      }
      else {
        // Method Syntax
        Products = list1.Intersect(list2, pc).ToList();
      }

      ResultText = $"Total Products: {Products.Count}";
    }
    #endregion

    #region Union
    /// <summary>
    /// Union() combines two lists together, but skips duplicates by using a comparer class
    /// This is like the UNION SQL operator
    /// </summary>
    public void Union()
    {
      ProductComparer pc = new ProductComparer();
      // Load all Product Data
      List<Product> list1 = ProductRepository.GetAll();
      // Load all Product Data
      List<Product> list2 = ProductRepository.GetAll();

      if (UseQuerySyntax) {
        // Query Syntax
        Products = (from prod in list1
                    select prod)
                    .Union(list2, pc)
                    .OrderBy(prod => prod.Name).ToList();
      }
      else {
        // Method Syntax
        Products = list1.Union(list2, pc)
                        .OrderBy(prod => prod.Name).ToList();
      }

      ResultText = $"Total Products: {Products.Count}";
    }
    #endregion

    #region LINQConcat
    /// <summary>
    /// The LINQ Concat() combines two lists together and does NOT check for duplicates
    /// This is like the UNION ALL SQL operator
    /// </summary>
    public void LINQConcat()
    {
      // Load all Product Data
      List<Product> list1 = ProductRepository.GetAll();
      // Load all Product Data
      List<Product> list2 = ProductRepository.GetAll();

      if (UseQuerySyntax) {
        // Query Syntax
        Products = (from prod in list1
                    select prod)
                    .Concat(list2)
                    .OrderBy(prod => prod.Name).ToList();
      }
      else {
        // Method Syntax
        Products = list1.Concat(list2)
                        .OrderBy(prod => prod.Name).ToList();
      }

      ResultText = $"Total Products: {Products.Count}";
    }
    #endregion
  }
}
