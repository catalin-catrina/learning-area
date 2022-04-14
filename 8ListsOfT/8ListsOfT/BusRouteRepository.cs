namespace _8ListsOfT
{
    public class BusRouteRepository
    {
        public static List<BusRoute> InitializeRoutes()
        {
            //BusRoute[] result = new BusRoute[]
            //{
            //    new BusRoute(40, new string[] {"Morecambe", "Lancaster", "Garstang", "Preston"}),
            //    new BusRoute(42, new string[] {"Lancaster", "Garstang", "Blackpool"}),
            //    new BusRoute(5, new string[] {"OVerton", "Morecambe", "Carnforth"}),
            //    new BusRoute(555, new string[] {"Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick"}),
            //    new BusRoute(1_000, new string[] {"Test origin", "Test destination"})
            //};
            //return result;

            //List<BusRoute> result = new List<BusRoute>();
            //result.Add(new BusRoute(40, new string[] { "Morecambe", "Lancaster", "Garstang", "Preston" }));
            //result.Add(new BusRoute(42, new string[] { "Lancaster", "Garstang", "Blackpool" }));
            //result.Add(new BusRoute(5, new string[] { "OVerton", "Morecambe", "Carnforth" }));
            //result.Add(new BusRoute(555, new string[] { "Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick" }));
            //result.Add(new BusRoute(1_000, new string[] { "Test origin", "Test destination" }));

            // Or we can initialize a list (or most other collections) like this
            // It's syntactic sugar, behind the scenes c# calls result.Add anyway
            List<BusRoute> result = new List<BusRoute>()
            {
            new BusRoute(40, new string[] { "Morecambe", "Lancaster", "Garstang", "Preston" }),
            new BusRoute(42, new string[] { "Lancaster", "Garstang", "Blackpool" }),
            new BusRoute(5, new string[] { "OVerton", "Morecambe", "Carnforth" }),
            new BusRoute(555, new string[] { "Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick" }),
            new BusRoute(1_000, new string[] { "Test origin", "Test destination" })
            };

            return result;
        }
    }
}