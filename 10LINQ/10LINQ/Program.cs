using _10LINQ.ViewModelClasses;

namespace _10LINQ
{
    class Program
    {
        static void Main(string[] args)
        {
            // Instantiate the Samples ViewModel
            SamplesViewModel vm = new SamplesViewModel
            {
                // Use query syntax or method syntax?
                UseQuerySyntax = false
            };

            // Select all products using a foreach loop
            //vm.GetAllLooping();
            // Select all products using LINQ
            //vm.GetAll();
            // Select single column
            //vm.GetSingleColumn();
            // Select multiple properties
            //vm.GetSpecificColumns();
            // Anonymous class (allows us to specify different property names than the one in the Product class)
            //vm.AnonymousClass();
            // Order by column
            //vm.OrderBy();
            // Order by column descending order
            //vm.OrderByDescending();
            // Order by two columns
            //vm.OrderByTwoFields();
            // Using where expression
            //vm.WhereExpression();
            // Using where expression with double conditions
            //vm.WhereTwoFields();
            // Implementing a where expression through an extension method
            //vm.WhereExtensionMethod();
            // Use the First method which searches forward returns the first element that matches a criteria or throws exception
            //vm.First();
            // Use the FirstOrDefault method which searches forward which returns the first element that matches
            // but the FirstOrDefault method does not throw an exception if it doesn't find anything, it returns null
            //vm.FirstOrDefault();
            // Use the Last method which searches backwards returns the first element that matches a criteria or throws exception
            // Last basically returns the last element that matches the criteria if you search forwards
            //vm.Last();
            // The LastOrDefault method searches backwards which returns the first element that matches or null
            //vm.LastOrDefault();
            // The Single method returns the only element that matches the criteria or an exception if no element or multiple elements match
            //vm.Single();
            // The SingleOrDefault method returns the only element that matches the criteria, null if no elements matched, or an exception if multiple matched
            //vm.SingleOrDefault();
            // ForEach allows you to iterate over a collection to perform assignments within each object.
            //vm.ForEach();
            // you can also call a method inside a ForEach to do the operations / assignments for you
            //vm.ForEachCallingMethod();
            // Use Take() to select a specified number of items from the beginning of a collection
            //vm.Take();
            // Use TakeWhile() until a condition is no longer true
            //vm.TakeWhile();
            // Skip() allows us to skip the first x items in the collection
            //vm.Skip();
            // SkipWhile() bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
            //vm.SkipWhile();
            // Distinct() selects distinct elements only
            //vm.Distinct(); 
            // All() returns true if all elements satisfy condition; otherwise false
            //vm.All();
            // Any() returns true if any element satisfies condition, otherwise false
            //vm.Any();
            // Contains() - used to check a list of primitives (ints, strings, etc)
            //vm.LINQContains();
            // However, when using Contains() with objects the default is to compare the objects' references
            // But we may need to look at a value of a property in that object, so we need to implement an EqualityComparer<T> class to
            // tell LINQ how to do the comparison (against which object and which property you wish to compare)
            //vm.LINQContainsUsingComparer();
            // SequenceEqual() compares two different collections to see if they are equal
            // When using simple data types such as int, string, a direct comparison between values is performed
            //vm.SequenceEqualIntegers();
            // When using a collection of objects, SequenceEqual() performs a comparison to see if the two object references point to the same object
            // unless we override the default behaviour of the Equals() method in the EqualityComparer class
            //vm.SequenceEqualObjects(); // false because this compares references
            // Use an EqualityComparer class to determine if the objects are the same based on the values in properties.
            //vm.SequenceEqualUsingComparer();
            // Except() selects everything in x that's not in y
            //vm.ExceptIntegers();
            // Except() needs an implementation of EqualityComparer for objects - by default it compares references but we want it to compare property values
            //vm.Except();
            // Intersect() selects values that are in both collections
            //vm.Intersect();
            // Union() puts together two collections but checks for duplicates
            //vm.Union();
            // Concat() puts together two collections but doesn't check for duplicates so it doesn't need an EqualityComparer implementation
            //vm.Concat();
            // InnerJoin (equijoin) with one field
            //vm.InnerJoin();
            // Inner join with two fields
            //vm.InnerJoinTwoFields();
            // Group join - create new object with Sales collection for each Product
            // Query syntax uses 'join' and 'into' keywords, method syntax used GroupJoin()
            //vm.GroupJoin();
            // Left outer join (technically there is no such thing as LINQ but we can simulate one)
            //vm.LeftOuterJoin();
            //vm.GroupBy();
            //vm.GroupByIntoSelect();
            //vm.GroupByOrderKey();
            //vm.GroupByWhere();
            //vm.GroupedSubQuery();
            //vm.Count();
            //vm.CountFiltered();
            //vm.Minimum();
            //vm.Maximum();
            //vm.Average();
            //vm.Sum();
            //vm.AggregateSum();
            //vm.AggregateCustom();
            //vm.AggregateUsingGrouping();
            //vm.AggregateUsingGroupingMoreEfficient();

            // Display Product Collection
            foreach (var item in vm.Products)
            {
                Console.WriteLine(item.ToString());
            }

            // Display Result Text
            Console.WriteLine(vm.ResultText);
        }
    }
}