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

        public SamplesViewModel()
        {
            Products = ProductRepository.GetAll();
            Sales = SalesOrderRetailRepository.GetAll();
        }

        // Put all products into a collection by looping
        public void GetAllLooping()
        {
            List<Product> list = new List<Product>();
            foreach(Product item in Products)
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

            foreach(string item in list)
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

        public void ForEach()
        {

        }
    }
}
