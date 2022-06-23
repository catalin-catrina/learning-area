namespace _8ArraysAndCollections___Dictionaries
{
    internal class BusRouteRepository
    {
        //public static List<BusRoute> InitializeRoutes()
        //{
        //    List<BusRoute> myList = new List<BusRoute>();
        //    myList.Add(new BusRoute(40, new string[] {"Morecambe", "Lancaser", "Garstang", "Preston"}));
        //    myList.Add(new BusRoute(42, new string[] { "Lancaster", "Garstang", "Blackpool" }));
        //    myList.Add(new BusRoute(100, new string[] { "University", "Lancaster", "Morecambe" }));
        //    myList.Add(new BusRoute(555, new string[] { "Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick" }));
        //    myList.Add(new BusRoute(5, new string[] { "Overton", "Morecambe", "Carnforth" }));
        //    return myList;
        //}

        public static Dictionary<int, BusRoute> InitializeRoutes()
        {
            //var routes = new Dictionary<int, BusRoute>();
            //routes.Add(42, new BusRoute(42, new string[] { "Lancaster", "Garstang", "Blackpool" }));
            //routes.Add(40, new BusRoute(40, new string[] { "Morecambe", "Lancaser", "Garstang", "Preston" }));
            //routes.Add(555, new BusRoute(555, new string[] { "Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick" }));
            //routes.Add(5, new BusRoute(5, new string[] { "Overton", "Morecambe", "Carnforth" }));
            //routes.Add(100, new BusRoute(100, new string[] { "University", "Lancaster", "Morecambe" }));
            //return routes;

            // Syntactic sugar, behind the scenes the compiler will do the calls to "Add" itself anyway
            var routes = new Dictionary<int, BusRoute>
            {
                { 42, new BusRoute(42, new string[] { "Lancaster", "Garstang", "Blackpool" }) },
                { 40, new BusRoute(40, new string[] { "Morecambe", "Lancaser", "Garstang", "Preston" }) },
                { 555, new BusRoute(555, new string[] { "Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick" }) },
                { 5, new BusRoute(5, new string[] { "Overton", "Morecambe", "Carnforth" }) },
                { 100, new BusRoute(100, new string[] { "University", "Lancaster", "Morecambe" }) }
            };
            return routes;
        }

        public static SortedDictionary<int, BusRoute> InitializeRoutes2()
        {
            //var routes = new Dictionary<int, BusRoute>();
            //routes.Add(42, new BusRoute(42, new string[] { "Lancaster", "Garstang", "Blackpool" }));
            //routes.Add(40, new BusRoute(40, new string[] { "Morecambe", "Lancaser", "Garstang", "Preston" }));
            //routes.Add(555, new BusRoute(555, new string[] { "Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick" }));
            //routes.Add(5, new BusRoute(5, new string[] { "Overton", "Morecambe", "Carnforth" }));
            //routes.Add(100, new BusRoute(100, new string[] { "University", "Lancaster", "Morecambe" }));
            //return routes;

            // Syntactic sugar, behind the scenes the compiler will do the calls to "Add" itself anyway
            var routes = new SortedDictionary<int, BusRoute>
            {
                { 42, new BusRoute(42, new string[] { "Lancaster", "Garstang", "Blackpool" }) },
                { 40, new BusRoute(40, new string[] { "Morecambe", "Lancaser", "Garstang", "Preston" }) },
                { 555, new BusRoute(555, new string[] { "Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick" }) },
                { 5, new BusRoute(5, new string[] { "Overton", "Morecambe", "Carnforth" }) },
                { 100, new BusRoute(100, new string[] { "University", "Lancaster", "Morecambe" }) }
            };
            return routes;
        }
    }
}