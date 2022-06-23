namespace _8ArraysAndCollections___Arrays_Intermediate
{
    class Program
    {
        static void Main(string[] args)
        {
            BusRoute[] allRoutes = BusRouteRepository.InitializeRoutes();

            Console.WriteLine("Where do you want to go?");
            var location = Console.ReadLine();

            BusRoute route = FindBusTo2(allRoutes, location);

            if (route != null)
            {
                Console.WriteLine($"You can use route {route}");
            }
            else
            {
                Console.WriteLine($"No routes go to {location}");
            }

            BusRouteWithArrayAsProperty[] allRoutes2 = BusRouteRepositoryWithArrayOfLocations.InitializeRoutes();
            Console.WriteLine("Where do you want to go?");
            var destination = Console.ReadLine();

            BusRouteWithArrayAsProperty[] route2 = FindBusTo3(allRoutes2, destination);
            if (route2 != null)
            {
                foreach (var r in route2) Console.WriteLine(r);
            }

        }

        public static BusRouteWithArrayAsProperty[] FindBusTo3(BusRouteWithArrayAsProperty[] routes, string location)
        {
            return Array.FindAll(routes, route => route.Serves(location));
        }

        // Most basic way of finding an item in an array
        public static BusRoute FindBusTo(BusRoute[] routes, string location)
        {
            foreach (BusRoute route in routes)
            {
                if (route.Origin == location || route.Destination == location)
                {
                    return route;
                }
            }
            return null;
        }

        // Using the predefined method Find() to find an item in an array
        public static BusRoute FindBusTo2(BusRoute[] routes, string location)
        {
            // Array is a class defined in the System namespace, and Find is a static method in that class
            // Array is the baseclass for all arrays in the common language runtime
            // when you declare an array usnig the [] syntax what you get is an instance of a type derived from System.Array
            // Array.Find returns the first element in the array that satisfies the condition specified
            return Array.Find(routes, route => route.Origin == location || route.Destination == location);
        }

        // FindAll is the same as Find but returns all items that match the specified condition (so it will return an array), or an empty array if none match
        public static BusRoute[] FindAllBussesTo(BusRoute[] routes, string location)
        {
            return Array.FindAll(routes, route => route.Origin == location || route.Destination == location);
        }
    }
}