namespace _8ArraysAndCollections___Arrays_Intermediate
{
    public class BusRoute
    {
        public int Number { get; }
        public string Origin { get; }
        public string Destination { get; }

        public BusRoute(int number, string origin, string destination)
        {
            Number = number;
            Origin = origin;
            Destination = destination;
        }

        public override string ToString() => $"{Number}: {Origin} -> {Destination}";
    }

    public class BusRouteWithArrayAsProperty
    {
        public int Number { get; }
        public string Origin => PlacesServed[0];
        public string Destination => PlacesServed[PlacesServed.Length - 1];
        public string[] PlacesServed { get; }

        public BusRouteWithArrayAsProperty(int number, string[] placesServed)
        {
            Number = Number;
            PlacesServed = placesServed;
        }

        public bool Serves(string? destination)
        {
            foreach (var place in PlacesServed)
            {
                if (place == destination) return true;
            }
            return false;
        }

        public override string ToString()
        {
            return $"{Number}: {Origin} - {Destination}";
        }
    }
}
