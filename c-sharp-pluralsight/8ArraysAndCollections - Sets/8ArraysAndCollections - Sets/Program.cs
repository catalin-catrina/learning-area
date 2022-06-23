namespace _8ArraysAndCollections___Sets
{
    class Program
    {
        static void Main(string[] args)
        {
            BusRouteRepository repository = new BusRouteRepository();

            Console.WriteLine("Where are you?");
            string startingAt = Console.ReadLine();

            Console.WriteLine("Where do you want to go?");
            string goingTo = Console.ReadLine();

            // Solving the problem with Arrays
            //BusRoute[] routes = repository.FindBusesBetween(startingAt, goingTo);
            
            // Solving the problem with a HashSet - take 2 arrays and intersect them
            BusRoute[] originRoutes = repository.FindBusesTo(startingAt);
            BusRoute[] destinationRoutes = repository.FindBusesTo(goingTo);

            HashSet<BusRoute> routes = new HashSet<BusRoute>(originRoutes);
            routes.IntersectWith(destinationRoutes);

            // You can also instantiate a new empty HashSet and add items to it like with lists and dictionaries
            //HashSet<BusRoute> routes2 = new HashSet<BusRoute>();
            //routes2.Add(new BusRoute(42, new string[] { }));
            //routes2.Add(new BusRoute(40, new string[] { }));
            // but passing an existing colletion to the constructor is easier

            if (routes.Count > 0)
            {
                foreach (var route in routes) Console.WriteLine($"You can use route {route}");
            }
            else
            {
                Console.WriteLine($"No routes go between {startingAt} and {goingTo}");
            }

            // HashSets can also do other operations
            // Union - combine collections
            HashSet<BusRoute> myHashSet = new HashSet<BusRoute>(originRoutes);
            myHashSet.UnionWith(destinationRoutes);

            // Difference - select the elements that are in the first collection that aren't in the other collection
            HashSet<BusRoute> myHashSet2 = new HashSet<BusRoute>(originRoutes);
            myHashSet.ExceptWith(destinationRoutes);
        }
    }
}