namespace _8ArraysAndCollections___Arrays_Intermediate
{
    public class BusRouteRepository
    {
        public static BusRoute[] InitializeRoutes()
        {
            return new BusRoute[]
            {
                new BusRoute(40, "Morecambe", "Preston"),
                new BusRoute(42, "Lancaster", "Blackpool"),
                new BusRoute(100, "University", "Morecambe"),
                new BusRoute(555, "Lancaster", "Keswick")
            };
        }
    }

    public class BusRouteRepositoryWithArrayOfLocations
    {
        public static BusRouteWithArrayAsProperty[] InitializeRoutes()
        {
            return new BusRouteWithArrayAsProperty[]
            {
                new BusRouteWithArrayAsProperty(40, new string[] {"Morecambe", "Lancaster", "Garstang", "Preston"}),
                new BusRouteWithArrayAsProperty(42, new string[] {"Lancaster", "Garstang", "Blackpool"}),
                new BusRouteWithArrayAsProperty(100, new string[] {"University", "Lancaster", "Morecambe"}),
                new BusRouteWithArrayAsProperty(555, new string[] {"Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick"})
            };
        }
    }
}