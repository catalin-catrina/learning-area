namespace _10LINQ.RepositoryClasses
{
    public static class LinqHelper
    {
        // FilterSimple<T> - name of the generic method
        // this IEnumerable<T> source - this is an extension method, so "this" says that any IEnumerable<T> is called "source",
        // and that's gonna be our query
        // Func<T, bool> - what's gonna be passed as the T - whatever that is, and it's gonna return a boolean, and that will be our predicate

        // Non-streaming extension method - we should not filter like this
        public static IEnumerable<T> FilterSimple<T> (this IEnumerable<T> source, Func<T, bool> predicate)
        {
            // result = new List of "T", whatever that T is gonna be, like "Product"
            var result = new List<T>();

            // for item in source (source being IEnumerable query
            foreach (var item in source)
            {
                // if "predicate", so we're actually passing in that function (F<T, bool> predicate) passing in the item
                // the item is of "T" type
                if (predicate(item))
                {
                    // if the predicate is true we add the item to the result list
                    result.Add(item);
                }
            }

            // return the final list
            return result;
        }

        // Streaming extension method - always include the yield keyword when filtering
        public static IEnumerable<T> FilterSimpleStreaming<T>(this IEnumerable<T> source, Func<T, bool> predicate)
        {
            // what this is doing is saying everytime through here I'm gonna yield control back once we find something that matches the predicate
            foreach (var item in source)
            {
                yield return item;
            }
        }
    }
}
