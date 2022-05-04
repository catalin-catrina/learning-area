namespace _8ListsOfT
{
    class Program
    {
        static void Main(string[] args)
        {
            // Arrays (T[]) are fixed size collections, instantiate with fixed number of elements
            // Lists (List<T>) are not fixed size, and can be instantiated empty and add the elements as you need them
            // All Collections except Arrays get the number of items using Count. Arrays get the number of items using Length

            List<BusRoute> allRoutes = BusRouteRepository.InitializeRoutes();

            // Remove items from a list at a specific index
            allRoutes.RemoveAt(4);

            // Remove items from a list that match a condition
            allRoutes.RemoveAll(route => route.Origin.StartsWith("University"));

            Console.WriteLine($"There are {allRoutes.Count} routes:");
            foreach (BusRoute route in allRoutes)
            {
                Console.WriteLine($"Route: {route}");
            }
        }
    }
}