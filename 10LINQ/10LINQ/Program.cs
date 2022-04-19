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
                UseQuerySyntax = true
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
            vm.Distinct();

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