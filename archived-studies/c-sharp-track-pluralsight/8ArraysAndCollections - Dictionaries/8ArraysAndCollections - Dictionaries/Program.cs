namespace _8ArraysAndCollections___Dictionaries 
{
    class Program
    {
        static void Main(string[] args)
        {
            //List<BusRoute> allRoutes = BusRouteRepository.InitializeRoutes();

            //Console.WriteLine("Which route you want to look up?");
            //int number = int.Parse(Console.ReadLine());

            //BusRoute answer = allRoutes.Find(route => route.Number == number);

            //if (answer != null) Console.WriteLine($"The route you asked for is {answer}");
            //else Console.WriteLine($"There is no route with number {number}");

            // Difference between dictionaries and sorted dictionaries is that sorted dictionaries sort the keys by default 
            // Sorted dictionaries can only sort the keys if they're integers or strings, otherwise we need to implement our own sorting implementation
            // There's also a SortedList<T1, T2> data type but they're also a sorted dictionary. Better than SortedDictionary when data is pre-sorted and
            // you won't be modifying much after instantiation. Generally though SortedDictionary<T1, T2> is just fine

            // Dictionary collection
            Dictionary<int, BusRoute> allRoutes = BusRouteRepository.InitializeRoutes();

            // Sorted Dictionary collection
            SortedDictionary<int, BusRoute> allRoutes2 = BusRouteRepository.InitializeRoutes2();

            Console.WriteLine("Print Values");
            foreach (BusRoute route in allRoutes.Values)
            {
                Console.WriteLine(route);
            }

            Console.WriteLine();

            Console.WriteLine("Print Keys");
            foreach(int route in allRoutes.Keys)
            {
                Console.WriteLine(route);
            }

            Console.WriteLine();

            Console.WriteLine("Print Keys and Values");
            foreach (var route in allRoutes)
            {
                Console.WriteLine(route);
            }

            Console.WriteLine();

            foreach(KeyValuePair<int, BusRoute> route in allRoutes2)
            {
                Console.WriteLine(route);
            }

            Console.WriteLine();
            Console.WriteLine("Which route you want to look up?");
            int number = int.Parse(Console.ReadLine());

            // We only look up keys in the dictionary if we're sure they exist, otherwise we get an error
            //BusRoute answer = allRoutes[number];

            // There are two ways to look up keys in a dictionary:
            // 1
            bool success = allRoutes.TryGetValue(number, out BusRoute answer);
            // 2
            bool success2 = allRoutes.ContainsKey(number);

            if (success) Console.WriteLine($"The route you asked for is {answer}");
            else Console.WriteLine($"There is no route with number {number}");
        }
    }
}