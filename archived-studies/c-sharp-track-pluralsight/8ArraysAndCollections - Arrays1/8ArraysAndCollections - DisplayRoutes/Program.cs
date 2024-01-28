using System;

namespace _8ArraysAndCollections___DisplayRoutes
{
    class Program
    {
        static void Main(string[] args)
        {
            // Array of strings
            string[] arrayOfStrings = { "C#", "Angular", "JavaScript" };

            // Array of integers
            int[] arrayOfInts = { 1, 2, 3 };

            BusRoute route40 = new BusRoute(40, "Morecambe", "Preston");
            BusRoute route42 = new BusRoute(42, "Lancaster", "Blackpool");

            // Console.WriteLine calls ToString() automatically to figure out what to write out to the console
            Console.WriteLine(route40);
            Console.WriteLine(route42);
            Console.WriteLine();

            // Array of objects
            // Declaring an empty array that will contain 4 elements of BusRoute type   
            // Objects are reference types so they'll all be initialized to null
            // If it was an array of integers for example, they'd have been initialized to 0
            BusRoute[] routes2 = new BusRoute[4];
            routes2[0] = route40;

            // Declaring an array of BusRoute elements
            BusRoute[] routes =
            {
                route40,
                route42,
                new BusRoute(100, "University", "Morecambe"),
                new BusRoute(555, "Lancaster", "Keswick")
            };

            // Iterating / Enumerating with the foreach loop
            foreach (BusRoute route in routes)
            {
                Console.WriteLine(route);
            }

            // Iterating / Enumerating with the for loop
            for (int i = 0; i < routes.Length; i++)
            {
                Console.WriteLine($"{i} - {routes[i]}");
            }

            // Getting the number of elements of the array
            var nrOfElements = routes.Length;
        }
    }
}