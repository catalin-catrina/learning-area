using System;
using System.Collections.Generic;

namespace LINQSamples
{
  public static class LinqHelper
  {
    #region FilterSimple
    /// <summary>
    /// DO NOT write a LINQ filter this way. It is very inefficient.
    /// </summary>
    public static IEnumerable<T> FilterSimple<T>(this IEnumerable<T> source, Func<T, bool> predicate)
    {
      var result = new List<T>();

      foreach (var item in source) {
        if (predicate(item)) {
          result.Add(item);
        }
      }

      return result;
    }
    #endregion

    #region Filter
    /// <summary>
    /// Always use the 'yield' statement when writing a LINQ filter
    /// </summary>
    public static IEnumerable<T> Filter<T>(this IEnumerable<T> source, Func<T, bool> predicate)
    {
      foreach (var item in source) {
        if (predicate(item)) {
          yield return item;
        }
      }
    }
    #endregion
  }
}
