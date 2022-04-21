using _10LINQ.EntityClasses;
using _10LINQ.RepositoryClasses;
using System.Text;

namespace _10LINQ.ViewModelClasses
{
    public class SamplesViewModel
    {
        public List<Product> Products { get; set; }
        public List<SalesOrderDetail> Sales { get; set; }
        public bool UseQuerySyntax { get; set; }
        public string ResultText { get; set; }

        public List<ProductLastModule> ProductsLastModule { get; set; } // for module 11 only

        public SamplesViewModel()
        {
            Products = ProductRepository.GetAll();
            Sales = SalesOrderRetailRepository.GetAll();
            ProductsLastModule = ProductRepositoryLastModule.GetAll();
        }

        // Put all products into a collection by looping
        public void GetAllLooping()
        {
            List<Product> list = new List<Product>();
            foreach (Product item in Products)
            {
                list.Add(item);
            }

            ResultText = $"Total products: {list.Count}";
        }

        // Put all products into a collection using LINQ
        public void GetAll()
        {
            List<Product> list = new List<Product>();

            if (UseQuerySyntax)
            {
                // Query Syntax
                // from <some_variable_name> in <some_collection> select <what_you_want_to_select>
                // in this case we want to select each product object, which in our case we named "prod", so we return the whole thing
                list = (from prod in Products select prod).ToList();
            }
            else
            {
                // Method syntax
                list = Products.Select(prod => prod).ToList();
            }

            ResultText = $"Total products: {list.Count}";
        }

        // Select a single column
        public void GetSingleColumn()
        {
            StringBuilder sb = new StringBuilder(1024);
            List<string> list = new List<string>();

            if (UseQuerySyntax)
            {
                // Query Syntax
                list.AddRange(from prod in Products select prod.Name);
            }
            else
            {
                // Method syntax
                list.AddRange(Products.Select(prod => prod.Name));
            }

            foreach (string item in list)
            {
                sb.AppendLine(item);
            }

            ResultText = $"Total products: {list.Count}" + Environment.NewLine + sb.ToString();
            Products.Clear();
        }

        // Get specific columns
        // Select a few specific properties from products and create new Product object
        public void GetSpecificColumns()
        {
            if (UseQuerySyntax)
            {
                // Query Syntax
                // overwrite the Products variable which is filled with all the Products, with only a selected few of the properties
                Products = (from prod in Products
                            select new Product
                            {
                                ProductID = prod.ProductID,
                                Name = prod.Name,
                                Size = prod.Size,
                            }).ToList();
            }
            else
            {
                // Method syntax
                Products.Select(prod => new Product { ProductID = prod.ProductID, Name = prod.Name, Size = prod.Size });
            }
            ResultText = $"Total products: {Products.Count}";
        }

        // Create an anonymous class with the selected product properties
        public void AnonymousClass()
        {
            StringBuilder sb = new StringBuilder(2048);
            if (UseQuerySyntax)
            {
                // Query syntax
                var products = (from prod in Products
                                select new
                                {
                                    Identifier = prod.ProductID,
                                    ProductName = prod.Name,
                                    ProductSize = prod.Size
                                });

                // Loop through anonymous class
                foreach (var prod in products)
                {
                    sb.AppendLine($"Product ID: {prod.Identifier}");
                    sb.AppendLine($"   Product Name: {prod.ProductName}");
                    sb.AppendLine($"   Product Size: {prod.ProductSize}");
                }
            }
            else
            {
                // Method syntax
                var products = Products.Select(prod => new
                {
                    Identifier = prod.ProductID,
                    ProductName = prod.Name,
                    ProductSize = prod.Size
                });

                // Loop through anonymous class
                foreach (var prod in products)
                {
                    sb.AppendLine($"Product ID: {prod.Identifier}");
                    sb.AppendLine($"   Product Name: {prod.ProductName}");
                    sb.AppendLine($"   Product Size: {prod.ProductSize}");
                }
            }
            ResultText = sb.ToString();
            Products.Clear();
        }

        // Order products by name
        public void OrderBy()
        {
            if (UseQuerySyntax)
            {
                // query syntax
                Products = (from prod in Products orderby prod.Name select prod).ToList();
            }
            else
            {
                // method syntax
                Products = Products.OrderBy(prod => prod.Name).ToList();
            }
            ResultText = $"Total products: {Products.Count}";
        }

        // Order products by name in descending order
        public void OrderByDescending()
        {
            if (UseQuerySyntax)
            {
                // query syntax
                Products = (from prod in Products orderby prod.Name descending select prod).ToList();
            }
            else
            {
                // method syntax
                Products = Products.OrderByDescending(prod => prod.Name).ToList();
            }
            ResultText = $"Total products: {Products.Count}";
        }

        // Order products by Color descending, then Name
        public void OrderByTwoFields()
        {
            if (UseQuerySyntax)
            {
                // query syntax
                // don't need to use the ascending keyword since that's the default order, it's just for clarity
                Products = (from prod in Products orderby prod.Color descending, prod.Name ascending select prod).ToList();
            }
            else
            {
                // method syntax
                Products = Products.OrderByDescending(prod => prod.Color).ThenBy(prod => prod.Name).ToList();
            }
            ResultText = $"Total products: {Products.Count}";
        }

        // Filter products using where. If the data is not found, return empty list
        public void WhereExpression()
        {
            string search = "L";

            if (UseQuerySyntax)
            {
                // query syntax
                Products = (from prod in Products where prod.Name.StartsWith(search) select prod).ToList();
            }
            else
            {
                // method syntax
                Products = Products.Where(prod => prod.Name.StartsWith(search)).ToList();
            }
            ResultText = $"Total products: {Products.Count}";
        }

        // Filter products using where with two fields
        public void WhereTwoFields()
        {
            string search = "L";
            decimal cost = 100;

            if (UseQuerySyntax)
            {
                Products = (from prod in Products where prod.Name.StartsWith(search) && prod.StandardCost > cost select prod).ToList();
            }
            else
            {
                Products = Products.Where(prod => prod.Name.StartsWith(search) && prod.StandardCost > cost).ToList();
            }
            ResultText = $"Total products: {Products.Count}";
        }

        // Filter products using a custom extension method
        public void WhereExtensionMethod()
        {
            string search = "Red";

            // The results of (from prod in Products select prod) is an IEnumerable<Product> which is why ByColor can be applied to it
            if (UseQuerySyntax)
            {
                Products = (from prod in Products select prod).ByColor(search).ToList();
            }
            else
            {
                Products = Products.Select(prod => prod).ByColor(search).ToList();
            }

            ResultText = $"Total products: {Products.Count}";
        }

        // Locate a specific product using First(). First() searches forward in a list until it finds the first element that matches criteria
        // First() throws an exception if the result does not produce any values
        public void First()
        {
            string search = "Red";
            Product value;

            try
            {
                if (UseQuerySyntax)
                {
                    // Query Syntax
                    value = (from prod in Products select prod).First(prod => prod.Color == search);
                }
                else
                {
                    // Method Syntax
                    value = Products.First(prod => prod.Color == search);
                }

                ResultText = $"Found: {value}";
            }
            catch
            {
                ResultText = "Not found";
            }

            Products.Clear();
        }

        // Locate a specific product using FirstOrDefault(). It searches forward in a list until it finds the first element that matches criteria
        // First() doesn't throw an exception if the result does not produce any values, instead it returns null
        public void FirstOrDefault()
        {
            string search = "Red";
            Product value;

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod).FirstOrDefault(prod => prod.Color == search);
            }
            else
            {
                //value = Products.Select(prod => prod).FirstOrDefault(prod => prod.Color == search);
                // same thing as
                value = Products.FirstOrDefault(prod => prod.Color == search);
            }

            if (value == null)
            {
                ResultText = "Not found";
            } else
            {
                ResultText = $"Found: {value}";
            }

            Products.Clear();
        }

        // Locate a specific product using Last(). Last() searches backwards in a list until it finds the first element that matches criteria
        // Last() throws an exception if the result does not produce any values
        public void Last()
        {
            string search = "Red";
            Product value;

            try
            {
                if (UseQuerySyntax)
                {
                    // Query Syntax
                    value = (from prod in Products select prod).Last(prod => prod.Color == search);
                }
                else
                {
                    // Method Syntax
                    value = Products.Last(prod => prod.Color == search);
                }

                ResultText = $"Found: {value}";
            }
            catch
            {
                ResultText = "Not found";
            }

            Products.Clear();
        }

        // LastOrDefault searches from the back of the list and returns the first element found or null
        public void LastOrDefault()
        {
            string search = "Red";
            Product value;

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod).LastOrDefault(prod => prod.Color == search);
            }
            else
            {
                //value = Products.Select(prod => prod).FirstOrDefault(prod => prod.Color == search);
                // same thing as
                value = Products.LastOrDefault(prod => prod.Color == search);
            }

            if (value == null)
            {
                ResultText = "Not found";
            }
            else
            {
                ResultText = $"Found: {value}";
            }

            Products.Clear();
        }

        // The Single method returns the only element that matches the criteria or an exception if no element or multiple elements match
        // We use Single() when we search for something like a primary key, so we expect only one to be in that collection since it's unique
        public void Single()
        {
            int search = 706;
            Product value;

            try
            {
                if (UseQuerySyntax)
                {
                    value = (from prod in Products select prod).Single(prod => prod.ProductID == search);
                }
                else
                {
                    value = Products.Single(prod => prod.ProductID == search);
                }

                ResultText = $"Found: {value}";
            }
            catch
            {
                ResultText = "Not found, or multiple elements found";
            }

            Products.Clear();
        }

        // The SingleOrDefault method returns the only element that matches the criteria, null if no elements matched, or an exception if multiple matched
        // The exception thrown if multiple elements are found is InvalidOperationException
        public void SingleOrDefault()
        {
            int search = 706;
            Product value;

            try
            {
                if (UseQuerySyntax)
                {
                    value = (from prod in Products select prod).SingleOrDefault(prod => prod.ProductID == search);
                }
                else
                {
                    //value = Products.Select(prod => prod).FirstOrDefault(prod => prod.Color == search);
                    // same thing as
                    value = Products.SingleOrDefault(prod => prod.ProductID == search);
                }

                if (value == null)
                {
                    ResultText = "Not found";
                }
                else
                {
                    ResultText = $"Found: {value}";
                }
            }
            catch
            {
                ResultText = "Multiple elements found";
            }

            Products.Clear();
        }

        // ForEach allows you to iterate over a collection to perform assignments within each object.
        // In this sample, assign the Length of the Name property to a property called NameLength
        // When using the Query syntax, assign the result to a temporary variable.
        public void ForEach()
        {
            if (UseQuerySyntax)
            {
                Products = (from prod in Products let temp = prod.NameLength = prod.Name.Length select prod).ToList();
            }
            else
            {
                Products.ForEach(prod => prod.NameLength = prod.Name.Length);
                // same thing as
                //Products.Select(prod => prod).ToList().ForEach(prod => prod.NameLength = prod.Name.Length);
            }
            ResultText = $"Total products: {Products.Count}";
        }

        // In the SalesForSpecificProduct method we pass in a product and look for all SALES that match that PRODUCT's id
        // then we sum the LineTotal property of all the sales that match
        public void ForEachCallingMethod()
        {
            if (UseQuerySyntax)
            {
                Products = (from prod in Products let tmp = prod.TotalSales = SalesForSpecificProduct(prod) select prod).ToList();
            }
            else
            {
                Products.ForEach(prod => prod.TotalSales = SalesForSpecificProduct(prod));
            }
            ResultText = $"Total products: {Products.Count}";
        }
        public decimal SalesForSpecificProduct(Product prod)
        {
            return Sales.Where(sale => sale.ProductID == prod.ProductID).Sum(sale => sale.LineTotal);
        }

        // Use Take() to select a specified number of items from the beginning of a collection
        public void Take()
        {
            if (UseQuerySyntax)
            {
                Products = (from prod in Products orderby prod.Name select prod).Take(5).ToList();
            }
            else
            {
                Products = Products.OrderBy(prod => prod.Name).Take(5).ToList();
            }
            ResultText = $"Total products: {Products.Count}";
        }

        // TakeWhile() - select elements until a condition is no longer true
        public void TakeWhile()
        {
            if (UseQuerySyntax)
            {
                Products = (from prod in Products orderby prod.Name select prod).TakeWhile(prod => prod.Name.StartsWith("A")).ToList();
            }
            else
            {
                Products = Products.OrderBy(prod => prod.Name).TakeWhile(prod => prod.Name.StartsWith("A")).ToList();
            }
            ResultText = $"Total products: {Products.Count}";
        }

        // Skip() - skip the first x items in the collection
        public void Skip()
        {
            if (UseQuerySyntax)
            {
                Products = (from prod in Products orderby prod.Name select prod).Skip(20).ToList();
            }
            else
            {
                Products = Products.OrderBy(prod => prod.Name).Skip(20).ToList();
            }

            ResultText = $"Total products: {Products.Count}";
        }

        // SkipWhile() - skip while the condition is true, and then return everything after that follows
        // - documentation definition - Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
        public void SkipWhile()
        {
            if (UseQuerySyntax)
            {
                Products = (from prod in Products orderby prod.Name select prod).SkipWhile(prod => prod.Name.StartsWith("A")).ToList();
            }
            else
            {
                Products = Products.OrderBy(prod => prod.Name).SkipWhile(prod => prod.Name.StartsWith("A")).ToList();
            }

            ResultText = $"Total products: {Products.Count}";
        }

        // Distinct() selects distinct elements only
        public void Distinct()
        {
            List<string> colors;

            if (UseQuerySyntax)
            {
                colors = (from prod in Products select prod.Color).Distinct().ToList();
            }
            else
            {
                colors = Products.Select(prod => prod.Color).Distinct().ToList();
            }

            foreach (string color in colors)
            {
                Console.WriteLine($"Color: {color}");
            }

            Console.WriteLine($"Total colors {colors.Count}");

            Products.Clear();
        }

        // All() searches all items in collection and returns true if all items match condition else false
        // Use All() to see if all items in a collection meet a specified condition
        public void All()
        {
            string search = " ";
            bool value;

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod).All(prod => prod.Name.Contains(search));
            }
            else
            {
                value = Products.All(prod => prod.Name.Contains(search));
            }

            ResultText = $"Do all Name properties contain a '{search}'? {value}";

            Products.Clear();
        }

        // Any() searches all items in collection and returns true if any items match condition else false
        // Use Any() to see if at least one item in a collection meets a specified condition
        public void Any()
        {
            string search = "z";
            bool value;

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod).Any(prod => prod.Name.Contains(search));
            }
            else
            {
                value = Products.Any(prod => prod.Name.Contains(search));
            }

            ResultText = $"Does any Name property contain a '{search}'? {value}";

            Products.Clear();
        }


        // Use the LINQ Contains operator to see if a collection contains a specific value
        public void LINQContains()
        {
            List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
            bool value;

            if (UseQuerySyntax)
            {
                value = (from val in numbers select val).Contains(3);
            }
            else
            {
                value = numbers.Contains(3);
            }

            ResultText = $"Is the number 3 in the collection? {value}";

            Products.Clear();
        }

        //  Use the LINQ Contains operator to see if a collection contains a specific object using an EqualityComparer class to perform the comparison
        public void LINQContainsUsingComparer()
        {
            int search = 744;
            bool value;
            ProductIdComparer comparer = new ProductIdComparer();
            Product prodtoFind = new Product { ProductID = search };

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod).Contains(prodtoFind, comparer);
            }
            else
            {
                value = Products.Contains(prodtoFind, comparer);
            }

            ResultText = $"Product ID: {search} is in Products Collection = {value}";

            Products.Clear();
        }

        /// <summary>
        /// COMPARE COLLECTIONS - SequenceEqual(), Except(), Intersect(), Concat()
        /// Primitive data types - automatic checking
        /// Object data types - need a comparer class
        /// </summary>
        // SequenceEqual() returns true if all the items match the items in the other collection, otherwise false
        // SequenceEqual() can compare primitives and objects but it needs to implement EqualityComparer for objects
        // otherwise it compares their references (addresses)
        // SequenceEqual() compares two different collections to see if they are equal
        // When using simple data types such as int, string, a direct comparison between values is performed
        public void SequenceEqualIntegers()
        {
            bool value;
            List<int> list1 = new List<int> { 1, 2, 3, 4, 5 };
            List<int> list2 = new List<int> { 1, 2, 3, 4, 5 };

            if (UseQuerySyntax)
            {
                value = (from num in list1 select num).SequenceEqual(list2);
            }
            else
            {
                value = list1.SequenceEqual(list2);
            }

            if (value)
            {
                ResultText = "Lists are equal";
            }
            else
            {
                ResultText = "Lists are not equal";
            }

            Products.Clear();
        }

        // Use SequenceEqual to compare Object types (Product types - products)
        // returns false because even though properties are the same, and the values, list1 and list2 are references to different objects on the heap
        public void SequenceEqualObjects()
        {
            bool value;

            List<Product> list1 = new List<Product>
            {
                new Product { ProductID = 1, Name = "Product 1"},
                new Product { ProductID = 2, Name = "Product 2" }
            };

            List<Product> list2 = new()
            {
                new Product { ProductID = 1, Name = "Product 1" },
                new Product { ProductID = 2, Name = "Product 2" }
            };

            if (UseQuerySyntax)
            {
                value = (from item in list1 select item).SequenceEqual(list2);
            }
            else
            {
                value = list1.SequenceEqual(list2);
            }

            if (value)
            {
                ResultText = "Lists are equal";
            }
            else
            {
                ResultText = "Lists are not equal";
            }

            Products.Clear();
        }

        // Use an EqualityComparer class to determine if the objects are the same based on the values in properties.
        public void SequenceEqualUsingComparer()
        {
            bool value;
            ProductComparer pc = new ProductComparer();
            List<Product> list1 = ProductRepository.GetAll();
            List<Product> list2 = ProductRepository.GetAll();

            // If we remove an item, or we change the value of a property of any of the Product objects, they are not equal anymore
            //list1.RemoveAt(0);

            if (UseQuerySyntax)
            {
                // Query Syntax
                value = (from prod in list1 select prod).SequenceEqual(list2, pc);
            }
            else
            {
                // Method Syntax
                value = list1.SequenceEqual(list2, pc);
            }

            if (value)
            {
                ResultText = "Lists are Equal";
            }
            else
            {
                ResultText = "Lists are NOT Equal";
            }

            // Clear List
            Products.Clear();
        }

        // Except() selects everything in a collection except the items that are also in another collection
        public void ExceptIntegers()
        {
            List<int> exceptions;
            List<int> list1 = new List<int> { 1, 2, 3, 4 };
            List<int> list2 = new List<int> { 3, 4, 5 };

            if (UseQuerySyntax)
            {
                exceptions = (from item in list1 select item).Except(list2).ToList();
            }
            else
            {
                exceptions = list1.Except(list2).ToList();
            }

            foreach (var item in exceptions)
            {
                ResultText = ResultText + $"Number: {item} {Environment.NewLine}";
            }

            Products.Clear();
        }

        // Except() with objects - again by default it compares objects' references, so we implemented EqualityComparer to compare property values
        // Except() selects everything in a collection that's not in another
        public void Except()
        {
            ProductComparer pc = new ProductComparer();
            List<Product> list1 = ProductRepository.GetAll();
            List<Product> list2 = ProductRepository.GetAll();

            list2.RemoveAll(prod => prod.Color == "Black");

            if (UseQuerySyntax)
            {
                Products = (from prod in list1 select prod).Except(list2, pc).ToList();
            }
            else
            {
                Products = list1.Except(list2, pc).ToList();
            }

            ResultText = $"Results count: {Products.Count}";
        }

        // Intersect() selects everything that's in both collections
        public void Intersect()
        {
            ProductComparer pc = new ProductComparer();
            List<Product> list1 = ProductRepository.GetAll();
            List<Product> list2 = ProductRepository.GetAll();

            list1.RemoveAll(prod => prod.Color == "Black");
            list2.RemoveAll(prod => prod.Color == "Red");

            if (UseQuerySyntax)
            {
                Products = (from prod in list1 select prod).Intersect(list2, pc).ToList();
            }
            else
            {
                Products = list1.Intersect(list2, pc).ToList();
            }

            ResultText = $"Results count: {Products.Count}";
        }

        // Union() adds two collections together but it checks for duplicates so it needs an EqualityComparer implementation
        public void Union()
        {
            ProductComparer pc = new ProductComparer();
            List<Product> list1 = ProductRepository.GetAll();
            List<Product> list2 = ProductRepository.GetAll();

            if (UseQuerySyntax)
            {
                Products = (from prod in list1 select prod).Union(list2, pc).OrderBy(prod => prod.Name).ToList();
            }
            else
            {
                Products = list1.Union(list2, pc).OrderBy(prod => prod.Name).ToList();
            }

            ResultText = $"Results count: {Products.Count}";
        }

        // Concat() adds two collections together without checking for duplicates, so it doesn't need an EqualityComparer implementation
        public void Concat()
        {
            List<Product> list1 = ProductRepository.GetAll();
            List<Product> list2 = ProductRepository.GetAll();

            if (UseQuerySyntax)
            {
                Products = (from prod in list1 select prod).Concat(list2).ToList();
            }
            else
            {
                Products = list1.Concat(list2).ToList();
            }

            ResultText = $"Results count: {Products.Count}";
        }

        /// <summary>
        /// JOINING COLLECTIONS - Inner joins, group joins and left outer joins
        /// </summary>
        // Equijoin / Inner Join (in SQL) - Two or more collections needed - at least one property in each must share equal values
        // Inner join with one field
        public void InnerJoin()
        {
            StringBuilder sb = new StringBuilder();
            int count = 0;

            if (UseQuerySyntax)
            {
                var query = (from prod in Products
                             join sale in Sales on prod.ProductID equals sale.ProductID
                             select new
                             {
                                 prod.ProductID,
                                 prod.Name,
                                 prod.Color,
                                 prod.StandardCost,
                                 prod.ListPrice,
                                 prod.Size,
                                 sale.SalesOrderID,
                                 sale.OrderQty,
                                 sale.UnitPrice,
                                 sale.LineTotal
                             });

                foreach (var item in query)
                {
                    count++;
                    sb.AppendLine($"Sales Order: {item.SalesOrderID}");
                    sb.AppendLine($"    Product ID: {item.ProductID}");
                    sb.AppendLine($"    Product name: {item.Name}");
                    sb.AppendLine($"    Size: {item.Size}");
                    sb.AppendLine($"    Order qty: {item.OrderQty}");
                    sb.AppendLine($"    Line total: {item.LineTotal}");
                }
            }
            else
            {
                var query = Products.Join(Sales, prod => prod.ProductID, sale => sale.ProductID, (prod, sale) => new
                {
                    prod.ProductID,
                    prod.Name,
                    prod.Color,
                    prod.StandardCost,
                    prod.ListPrice,
                    prod.Size,
                    sale.SalesOrderID,
                    sale.OrderQty,
                    sale.UnitPrice,
                    sale.LineTotal
                });

                foreach (var item in query)
                {
                    count++;
                    sb.AppendLine($"Sales Order: {item.SalesOrderID}");
                    sb.AppendLine($"    Product ID: {item.ProductID}");
                    sb.AppendLine($"    Product name: {item.Name}");
                    sb.AppendLine($"    Size: {item.Size}");
                    sb.AppendLine($"    Order qty: {item.OrderQty}");
                    sb.AppendLine($"    Line total: {item.LineTotal}");
                }
            }

            ResultText = $"{sb} {Environment.NewLine} Total sales: {count}";

            Products.Clear();
        }

        // Inner join with two fields
        // When we want to join on more than one property, we create an anonymous class (new { })
        public void InnerJoinTwoFields()
        {
            short qty = 6;
            int count = 0;

            StringBuilder sb = new StringBuilder();

            if (UseQuerySyntax)
            {
                var query = (from prod in Products join sale in Sales on
                             new { prod.ProductID, Qty = qty } equals new { sale.ProductID, Qty = sale.OrderQty }
                             select new
                             {
                                 prod.ProductID,
                                 prod.Name,
                                 prod.Color,
                                 prod.StandardCost,
                                 prod.ListPrice,
                                 prod.Size,
                                 sale.SalesOrderID,
                                 sale.OrderQty,
                                 sale.UnitPrice,
                                 sale.LineTotal
                             });

                foreach (var item in query)
                {
                    count++;
                    sb.AppendLine($"Sales Order: {item.SalesOrderID}");
                    sb.AppendLine($"    Product ID: {item.ProductID}");
                    sb.AppendLine($"    Product name: {item.Name}");
                    sb.AppendLine($"    Size: {item.Size}");
                    sb.AppendLine($"    Order qty: {item.OrderQty}");
                    sb.AppendLine($"    Line total: {item.LineTotal}");
                }
            }
            else
            {
                var query = Products.Join(Sales,
                    prod => new { prod.ProductID, Qty = qty },
                    sale => new { sale.ProductID, Qty = sale.OrderQty },
                    (prod, sale) => new
                    {
                        prod.ProductID,
                        prod.Name,
                        prod.Color,
                        prod.StandardCost,
                        prod.ListPrice,
                        prod.Size,
                        sale.SalesOrderID,
                        sale.OrderQty,
                        sale.UnitPrice,
                        sale.LineTotal
                    });

                foreach (var item in query)
                {
                    count++;
                    sb.AppendLine($"Sales Order: {item.SalesOrderID}");
                    sb.AppendLine($"    Product ID: {item.ProductID}");
                    sb.AppendLine($"    Product name: {item.Name}");
                    sb.AppendLine($"    Size: {item.Size}");
                    sb.AppendLine($"    Order qty: {item.OrderQty}");
                    sb.AppendLine($"    Line total: {item.LineTotal}");
                }
            }

            ResultText = $"{sb} {Environment.NewLine} Total sales: {count}";

            Products.Clear();
        }

        // Group join - create new object with Sales collection for each Product - one to many type relationship
        // Query syntax uses 'join' and 'into' keywords, method syntax used GroupJoin()
        public void GroupJoin()
        {
            StringBuilder sb = new StringBuilder();
            IEnumerable<ProductSales> query;

            if (UseQuerySyntax)
            {
                query = (from prod in Products
                         join sale in Sales on prod.ProductID equals sale.ProductID into sales
                         select new ProductSales
                         {
                             Product = prod,
                             Sales = sales
                         });
            }
            else
            {
                query = Products.GroupJoin(Sales, prod => prod.ProductID, sale => sale.ProductID, (prod, sales) => new ProductSales
                {
                    Product = prod,
                    Sales = sales.ToList()
                });
            }

            foreach (var ps in query)
            {
                sb.AppendLine($"Product: {ps.Product}");
                if (ps.Sales.Count() > 0)
                {
                    sb.AppendLine($"    **SALES FOR {ps.Product.Name}");
                    foreach (var sale in ps.Sales)
                    {
                        sb.AppendLine($"    SalesOrderID: {sale.SalesOrderID}");
                        sb.AppendLine($"    Qty: {sale.OrderQty}");
                        sb.AppendLine($"    Total: {sale.LineTotal}");
                    }
                }
                else
                {
                    sb.AppendLine($"No sales for product {ps.Product.Name}");
                }
                sb.AppendLine();
            }

            ResultText = sb.ToString();

            Products.Clear();
        }

        // Left outer join (technically there is no such thing as LINQ but we can simulate one)
        // let's say we want to see all products and then IF there are sales we want to write them out otherwise no values printed for that product
        // inner join using 'into' and a second 'from' statement. a null object may be returned for "right" collection, so we use 
        // DefaultIfEmpty() method for "right" collection (which returns am empty object for the right side - Sales in our case)
        // The method syntax uses SelectMany(), Where() and DefaultIfEmpty()
        public void LeftOuterJoin()
        {
            StringBuilder sb = new StringBuilder();
            int count = 0;

            if (UseQuerySyntax)
            {
                // join Products and Sales on prod.ProductID == sale.ProductID and put everything into sales (which is an anonymous variable
                // that we can name however we want). We then say fr
                // we say sales.DefaultIfEmpty() because if there are no sales for a particular product, give us a default empty SalesOrderDetail object
                // There is always gonna be a prod in Products because it's on the left side of the join,
                // but the Sales might be empty so we use "?" after a variable name (null-conditional operator), which only retrieves the value
                // from the variable if it is non-null
                var query = (from prod in Products join sale in Sales on prod.ProductID equals sale.ProductID into sales
                             from sale in sales.DefaultIfEmpty() select new
                             {
                                 prod.ProductID,
                                 prod.Name,
                                 prod.Color,
                                 prod.StandardCost,
                                 prod.ListPrice,
                                 prod.Size,
                                 sale?.SalesOrderID,
                                 sale?.OrderQty,
                                 sale?.UnitPrice,
                                 sale?.LineTotal
                             }).OrderBy(ps => ps.Name);

                foreach (var item in query)
                {
                    count++;
                    sb.AppendLine($"Product Name: {item.Name} ({item.ProductID})");
                    sb.AppendLine($"    Order ID: {item.SalesOrderID}");
                    sb.AppendLine($"    Size: {item.Size}");
                    sb.AppendLine($"    Order Qty: {item.OrderQty}");
                    sb.AppendLine($"    Total: {item.LineTotal}");
                }
            }
            else {
                // The first parameter to SelectMany() is the sales data matched in with the product data on the ProductID
                // if there are Sales for that specific Product, each Product and each Sale object is passed onto the
                // second parameter - (prod,sale) => new {etc}, which is a function that accepts two values: in our case "prod" and "sale"
                // So the SelectMany() will then create this anonymous class from the Product and the Sale data
                var query = Products.SelectMany(sale => Sales.Where(s => sale.ProductID == s.ProductID).DefaultIfEmpty(),
                    (prod, sale) => new
                    {
                        prod.ProductID,
                        prod.Name,
                        prod.Color,
                        prod.StandardCost,
                        prod.ListPrice,
                        prod.Size,
                        sale?.SalesOrderID,
                        sale?.OrderQty,
                        sale?.UnitPrice,
                        sale?.LineTotal
                    }).OrderBy(ps => ps.Name);

                foreach (var item in query)
                {
                    count++;
                    sb.AppendLine($"Product Name: {item.Name} ({item.ProductID})");
                    sb.AppendLine($"    Order ID: {item.SalesOrderID}");
                    sb.AppendLine($"    Size: {item.Size}");
                    sb.AppendLine($"    Order Qty: {item.OrderQty}");
                    sb.AppendLine($"    Total: {item.LineTotal}");
                }
            }

            Console.WriteLine(sb.ToString());

            Products.Clear();
        }

        /// <summary>
        ///  Creating groups of data using GroupBy
        ///  group by creates a one-to-many structure
        ///  order by is optional and can order before grouping or after
        ///  we can filter grouped data using the where expression
        ///  we can build our own grouped subquery
        /// </summary>
        // 
        public void GroupBy()
        {
            StringBuilder sb = new StringBuilder();
            // IGrouping<key, T>
            IEnumerable<IGrouping<string, Product>> query;

            if (UseQuerySyntax)
            {
                // the orderby is optional, add if you want the resulting group to be ordered
                query = (from prod in Products orderby prod.Size group prod by prod.Size);
            }
            else
            {
                query = Products.OrderBy(prod => prod.Size).GroupBy(prod => prod.Size);
            }

            // loop through the keys (in this case the size)
            foreach (var item in query)
            {
                // the value in the "key" property is whatever data you grouped upon
                sb.AppendLine($"Size: {item.Key} Count: {item.Count()}");

                // loop through the products in each size
                foreach (var prod in item)
                {
                    sb.Append($"    ProductID: {prod.ProductID}");
                    sb.Append($"    Name: {prod.Name}");
                    sb.AppendLine($"    Color: {prod.Color}");
                }
            }

            ResultText = sb.ToString();

            Products.Clear();
        }

        // Group by using "into" and "select" and order by "Key" property
        public void GroupByIntoSelect()
        {
            StringBuilder sb = new StringBuilder();
            IEnumerable<IGrouping<string, Product>> group;

            if (UseQuerySyntax)
            {
                group = (from prod in Products orderby prod.Size group prod by prod.Size into sizes select sizes);
            }
            else
            {
                group = Products.OrderBy(prod => prod.Size).GroupBy(prod => prod.Size);
            }

            foreach (var size in group)
            {
                sb.AppendLine($"Size: {size.Key} Count: {size.Count()}");
                foreach (var prod in size)
                {
                    sb.Append($"    ProductID: {prod.ProductID}");
                    sb.Append($"    Name: {prod.Name}");
                    sb.AppendLine($"    Color: {prod.Color}");
                }
            }

            ResultText = sb.ToString();

            Products.Clear();
        }

        // orderby can either order the data first then grouping, or after you grouped order by your key-value
        public void GroupByOrderKey()
        {
            StringBuilder sb = new StringBuilder();
            IEnumerable<IGrouping<string, Product>> group;

            if (UseQuerySyntax)
            {
                // if you want to do the ordering on the key that you get back from the grouping, you need to use the "into" 
                group = (from prod in Products group prod by prod.Size into sizes orderby sizes.Key select sizes);
            }
            else
            {
                group = Products.GroupBy(prod => prod.Size).OrderBy(sizes => sizes.Key).Select(sizes => sizes);
            }

            foreach (var size in group)
            {
                sb.AppendLine($"Size: {size.Key} Count: {size.Count()}");
                foreach (var prod in size)
                {
                    sb.Append($"    ProductID: {prod.ProductID}");
                    sb.Append($"    Name: {prod.Name}");
                    sb.AppendLine($"    Color: {prod.Color}");
                }
            }

            ResultText = sb.ToString();

            Products.Clear();
        }

        // Filter the Grouped results using where expresison
        public void GroupByWhere()
        {
            StringBuilder sb = new StringBuilder();
            IEnumerable<IGrouping<string, Product>> sizeGroup;

            if (UseQuerySyntax)
            {
                sizeGroup = (from prod in Products group prod by prod.Size into sizes where sizes.Count() > 2 select sizes);
            }
            else
            {
                sizeGroup = Products.GroupBy(prod => prod.Size).Where(sizes => sizes.Count() > 2).Select(sizes => sizes);
            }

            foreach (var size in sizeGroup)
            {
                sb.AppendLine($"Size: {size.Key} Count: {size.Count()}");
                foreach (var prod in size)
                {
                    sb.Append($"    ProductID: {prod.ProductID}");
                    sb.Append($"    Name: {prod.Name}");
                    sb.AppendLine($"    Color: {prod.Color}");
                }
            }

            ResultText = sb.ToString();

            Products.Clear();
        }

        // Creating a one-to-many structure using a subquery
        // create a collection of Products for a Sale - Similar to the GroupJoin() - add another query within select
        public void GroupedSubQuery()
        {
            StringBuilder sb = new StringBuilder();
            IEnumerable<SaleProducts> salesGroup;

            // Get all products for a sales order id
            if (UseQuerySyntax)
            {
                salesGroup = (from sale in Sales
                              group sale by sale.SalesOrderID into sales
                              select new SaleProducts
                              {
                                  SalesOrderID = sales.Key,
                                  Products = (from prod in Products
                                              join sale in Sales on prod.ProductID equals sale.ProductID
                                              where sale.SalesOrderID == sales.Key
                                              select prod).ToList()
                              });
            }
            else
            {
                salesGroup = Sales.GroupBy(sale => sale.SalesOrderID).Select(sales => new SaleProducts
                {
                    SalesOrderID = sales.Key,
                    Products = Products.Join(sales, prod => prod.ProductID, sale => sale.ProductID, (prod, sale) => prod).ToList()
                });
            }

            foreach (var sale in salesGroup)
            {
                sb.AppendLine($"Sales ID: {sale.SalesOrderID}");

                if (sale.Products.Count > 0)
                {
                    // Loop through the products in each sale
                    foreach (var prod in sale.Products)
                    {
                        sb.Append($"    ProductID: {prod.ProductID}");
                        sb.Append($"    Name: {prod.Name}");
                        sb.AppendLine($"    Color: {prod.Color}");
                    }
                }
                else
                {
                    sb.AppendLine("     Product ID not found for this sale");
                }
            }

            ResultText = sb.ToString();

            Products.Clear();
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// Aggregating data in collections
        /// Use aggregate functions: Count, Min, Max, Average and Sum
        /// Use Aggregate() - building your own type of count, min, max, average and sum
        /// Aggregate by a group of data
        /// More efficient aggregation
        /// 
        /// Aggregate functions calculate a single value from property in collections - method applied after every query
        /// </summary>
        // Count and Count using a filter
        public void Count()
        {
            int value;
            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod).Count();
            }
            else
            {
                value = Products.Count();
            }
            ResultText = $"Total products: {value}";
            Products.Clear();
        }

        public void CountFiltered()
        {
            int value;
            string filter = "Red";

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod).Count(prod => prod.Color == filter);
                // same thing as
                //value = (from prod in Products where prod.Color == filter).Count();
            }
            else
            {
                value = Products.Count(prod => prod.Color == filter);
                // same thing as
                //Products.Where(prod => prod.Color == filter).Count();
            }

            ResultText = $"Total products with a color of red: {value}";
            Products.Clear();
        }

        // Min() returns the minimum value of a properrty in a collection
        public void Minimum()
        {
            decimal? value;

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod.ListPrice).Min();
                // Alternate syntax
                //value = (from prod in Products select prod).Min(prod => prod.ListPrice);
            }
            else
            {
                value = Products.Min(prod => prod.ListPrice);
            }

            if (value.HasValue)
            {
                ResultText = $"Minimum List Price: {value.Value}";
            }
            else
            {
                ResultText = "No list prices exist";
            }

            Products.Clear();
        }

        // Max() returns the minimum value of a properrty in a collection
        public void Maximum()
        {
            decimal? value;

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod.ListPrice).Max();
                // Alternate syntax
                //value = (from prod in Products select prod).Max(prod => prod.ListPrice);
            }
            else
            {
                value = Products.Max(prod => prod.ListPrice);
            }

            if (value.HasValue)
            {
                ResultText = $"Max list price: {value.Value}";
            }
            else
            {
                ResultText = $"No list prices found";
            }

            Products.Clear();
        }

        public void Average()
        {
            decimal? value;

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod.ListPrice).Average();
                //value = (from prod in Products select prod).Average(prod => prod.ListPrice);
            }
            else
            {
                value = Products.Average(prod => prod.ListPrice);
            }

            if (value.HasValue)
            {
                ResultText = $"Average list price: {value}";
            }
            else
            {
                ResultText = $"No list prices exist";
            }

            Console.WriteLine(value);
            Console.WriteLine(value.Value);
            Console.WriteLine(value == value.Value); // true

            Products.Clear();
        }

        public void Sum()
        {
            decimal? value;

            if (UseQuerySyntax)
            {
                value = (from prod in Products select prod.ListPrice).Sum();
                //value = (from prod in Products select prod).Sum(prod => prod.ListPrice);
            }
            else
            {
                value = Products.Sum(prod => prod.ListPrice);
            }

            if (value.HasValue)
            {
                ResultText = $"Total list price: {value}";
            }
            else
            {
                ResultText = $"No list prices exist";
            }

            Products.Clear();
        }

        // Aggregate method - iterate over colelction - suply a custom method for calculating - return single value
        public void AggregateSum()
        {
            decimal? value = 0;

            if (UseQuerySyntax)
            {
                // The first parameter of the aggregate method initializez an internal variable that they create in this Aggregate method
                // In this case we initialize it to 0 and it's a decimal
                // The second parameter is an anonymous function to which you pass the sum (that 0 (zero) from before) and each
                // product as it loops through, and then you perform your calculation
                // and we do sum = sum + prod.ListPrice so we're simulating a Sum, which is already built into LINQ
                value = (from prod in Products select prod).Aggregate(0M, (sum, prod) => sum += prod.ListPrice);
            }
            else
            {
                value = Products.Aggregate(0M, (sum, prod) => sum = sum + prod.ListPrice);
            }

            if (value.HasValue)
            {
                ResultText = $"Total of all list prices = {value.Value}";
            }
            else
            {
                ResultText = $"No list price found";
            }

            Products.Clear();
        }

        // Aggregate method with a custom anonymous function
        public void AggregateCustom()
        {
            decimal? value = 0;

            if (UseQuerySyntax)
            {
                // as long as you're able to express everything on one line you don't need to call a custom function
                // but you could call a custom function here and pass in the sum and sale
                value = (from sale in Sales select sale).Aggregate(0M, (sum, sale) => sum += (sale.OrderQty * sale.UnitPrice));
            }
            else
            {
                value = Sales.Aggregate(0M, (sum, sale) => sum += (sale.OrderQty * sale.UnitPrice));
            }

            if (value.HasValue)
            {
                ResultText = $"Total of all list prices = {value.Value}";
            }
            else
            {
                ResultText = "No list prices available";
            }

            Products.Clear();
        }

        // Group products then use aggregate method
        public void AggregateUsingGrouping()
        {
            StringBuilder sb = new StringBuilder();

            if (UseQuerySyntax)
            {
                // group products by size in "sizeGroup" 
                // select a new anonymous object for which we define some properties
                // we then take that anonymous object and put it into "result"
                // order it by size and select that result
                var stats = (from prod in Products
                             group prod by prod.Size into sizeGroup
                             where sizeGroup.Count() > 0
                             select new
                             {
                                 Size = sizeGroup.Key,
                                 TotalProducts = sizeGroup.Count(),
                                 Max = sizeGroup.Max(s => s.ListPrice),
                                 Min = sizeGroup.Min(s => s.ListPrice),
                                 Average = sizeGroup.Average(s => s.ListPrice)
                             }
                             into result orderby result.Size select result);

                // Loop through each product statistic
                foreach (var stat in stats)
                {
                    sb.AppendLine($"Size: {stat.Size} Count: { stat.TotalProducts}");
                    sb.AppendLine($"    Min: {stat.Min}");
                    sb.AppendLine($"    Max: {stat.Max}");
                    sb.AppendLine($"    Average: {stat.Average}");
                }
            }
            else
            {
                var stats = Products.GroupBy(sale => sale.Size).Where(sizeGroup => sizeGroup.Count() > 0)
                    .Select(sizeGroup => new {
                        Size = sizeGroup.Key,
                        TotalProducts = sizeGroup.Count(),
                        Max = sizeGroup.Max(s => s.ListPrice),
                        Min = sizeGroup.Min(s => s.ListPrice),
                        Average = sizeGroup.Average(s => s.ListPrice)
                    });

                // Loop through each product statistic
                foreach (var stat in stats)
                {
                    sb.AppendLine($"Size: {stat.Size} Count: { stat.TotalProducts}");
                    sb.AppendLine($"    Min: {stat.Min}");
                    sb.AppendLine($"    Max: {stat.Max}");
                    sb.AppendLine($"    Average: {stat.Average}");
                }
            }
            ResultText = sb.ToString();
            Products.Clear();
        }

        // A more efficient way of doing the same grouping and aggregation as before
        // We'll create our own class to hold accumulators, create one property for each count, min, max etc
        // We'll still use Aggregate() but we're going to only loop over the data one time to gather statistics
        // In the anonymous class above we kept using sizeGroup.Min, sizeGroup.Max, so that means it had to loop over
        // that group of products in that grouping to actually gather each individual statistic
        // Now we're just going to do it a single time for each product that we come to
        public void AggregateUsingGroupingMoreEfficient()
        {
            StringBuilder sb = new StringBuilder();

            // Method syntax only
            var stats = Products.GroupBy(sale => sale.Size)
                .Where(sizegroup => sizegroup.Count() > 0)
                .Select(sizeGroup =>
            {
                var results = sizeGroup.Aggregate(new ProductStats(),
                    (acc, prod) => acc.Accumulate(prod),
                    acc => acc.ComputeAverage());

                return new
                {
                    // Remember in the last example we called Count(), Min(), Max() and Average() for each property
                    // Now, the values have already been calculated. This is why this is more efficient
                    Size = sizeGroup.Key,
                    results.TotalProducts,
                    results.Min,
                    results.Max,
                    results.Average
                };
            });

            foreach (var stat in stats)
            {
                sb.AppendLine($"Size: {stat.Size} Count: { stat.TotalProducts}");
                sb.AppendLine($"    Min: {stat.Min}");
                sb.AppendLine($"    Max: {stat.Max}");
                sb.AppendLine($"    Average: {stat.Average}");
            }

            ResultText = sb.ToString();
            Products.Clear();
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// DEFERRED EXECUTION 
        /// - a LINQ query is a data structure ready to execute but is not executed yet
        /// - so query is not executed until a value is needed
        /// - execution happens when you use a foreach(), or the Count() method, or the ToList(), OrderBy() etc.
        /// Example:
        /// IEnumerable<Product> query = (from prod in Products where prod.Color == "Red" select prod); // create a query (data structure)
        /// foreach(var item in query) Console.WriteLine(item.Name); // here the query starts executing because we need it for something
        /// 
        /// IMMEDIATE EXECUTION
        /// - Query is ready to executed immediately
        /// - An operator/method that requires all items to be processed (ToList, OrderBy, etc)
        /// Example:
        /// // create a query (data structure) and because ToList() is applied, the query is executed immediately
        /// IEnumerable<Product> query = (from prod in Products select prod).ToList();
        /// 
        /// STREAMING OPERATORS 
        /// - Results can be returned prior to the entire collection is read
        /// - Distinct(), GroupBy(), Join(), Select(), Skip(), Take(), Union(), Where()
        /// - these methods can start giving us values back in a foreach even though it hasn't necessarily gone through the whole collection yet
        /// - it's giving each one as it finds it, as we move through the list
        /// Example:
        /// // both Select() and Where() are deferred and streaming operations, if they weren't, then the Products collection would have
        /// // to be looped through two times, once for the Select() and once for the Where()
        /// var results = Products.Select(p => p).Where(p => p.Color = "Red");
        /// 
        /// NON-STREAMING OPERATIONS
        /// - All data in a collection must be read before a result can be returned
        /// - Except(), GroupBy(), GroupJoin(), Intersect(), Join(), OrderBy(), ThenBy()
        /// </summary>
        // Deferred execution - with foreach and with enumerator
        const string COLOR = "Red";

        public void DeferredExecution()
        {
            IEnumerable<ProductLastModule> query;

            // Create LINQ query
            query = ProductsLastModule.Where(prod => prod.Color == COLOR);

            Console.WriteLine("");

            foreach (ProductLastModule product in query)
            {
                Console.WriteLine(product);
            }

            // same as foreach
            // query - being an IEnumerable, has a method called GetEnumerator(), which returns an IEnumerator that we store in the variable enumerator
            //IEnumerator<ProductLastModule> enumerator = query.GetEnumerator();
            //while(enumerator.MoveNext())
            //{
            //    Console.WriteLine(enumerator.Current.Name);
            //}

            Products.Clear();
        }

        // Creating our own "where" with a filtering extension method
        // the filter here goes through the whole collection one time to gather each one of those items
        // and it does so using that if predicate
        // using FilterSimple we go through all products and then spit out those that match condition
        public void DeferredExecutionWithExtensionMethod()
        {
            IEnumerable<ProductLastModule> query;

            query = ProductsLastModule.FilterSimple(prod => prod.Color == COLOR);

            foreach (ProductLastModule product in query)
            {
                Console.WriteLine(product);
            }

            Products.Clear();
        }

        public void DeferredExecutionWithNonStreamingExtensionMethodVsWhere()
        {
            IEnumerable<ProductLastModule> query;

            // FilterSimple will go through all the items and then take 1, the first one that matches condition
            query = ProductsLastModule.FilterSimple(prod => prod.Color == COLOR).Take(1);

            // Where will take 1, the one that matches, and stop printing the rest
            //query = ProductsLastModule.Where(prod => prod.Color == COLOR).Take(1);

            foreach(ProductLastModule product in query)
            {
                Console.WriteLine(product);
            }

            Products.Clear();
        }

        public void DeferredExecutionWithStreamingExtensionMethod()
        {
            IEnumerable<ProductLastModule> query;

            // FilterSimpleStreaming is now like "Where" method from Microsoft
            query = ProductsLastModule.FilterSimpleStreaming(prod => prod.Color == COLOR);

            //query = ProductsLastModule.Where(prod => prod.Color == COLOR);

            foreach (ProductLastModule product in query)
            {
                Console.WriteLine(product);
            }

            Products.Clear();
        }

        public void DeferredExecutionWithStreamingExtensionMethodStreamingOperation()
        {
            IEnumerable<ProductLastModule> query;

            // FilterSimpleStreaming is now like "Where" method from Microsoft
            query = ProductsLastModule.FilterSimpleStreaming(prod => prod.Color == COLOR).Take(1);

            //query = ProductsLastModule.Where(prod => prod.Color == COLOR).Take(1);

            Console.WriteLine("");
            foreach (ProductLastModule product in query)
            {
                Console.WriteLine(product);
            }

            Products.Clear();
        }

        public void DeferredExecutionWithStreamingExtensionMethodNonStreamingOperation()
        {
            IEnumerable<ProductLastModule> query;

            // FilterSimpleStreaming is now like "Where" method from Microsoft
            // Since orderby is a non-streaming operation (it needs all results to be able to order), this whole thing now becomes non-streaming
            query = ProductsLastModule.FilterSimpleStreaming(prod => prod.Color == COLOR).OrderBy(prod => prod.Color);
            // we can first only filter and then order to order less items though

            //query = ProductsLastModule.Where(prod => prod.Color == COLOR).OrderBy(prod => prod.Color);

            Console.WriteLine("");
            foreach (ProductLastModule product in query)
            {
                Console.WriteLine(product);
            }

            Products.Clear();
        }
    }
}
 