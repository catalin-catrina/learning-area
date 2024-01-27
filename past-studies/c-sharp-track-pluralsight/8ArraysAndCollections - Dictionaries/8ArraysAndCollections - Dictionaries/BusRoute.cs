namespace _8ArraysAndCollections___Dictionaries
{
    public class BusRoute
    {
        public int Number { get; }
        public string[] Cities { get; }
        public string Origin => Cities[0];
        public string Destination => Cities[Cities.Length - 1];

        public BusRoute(int number, string[] cities)
        {
            Number = number;
            Cities = cities;
        }

        public override string ToString()
        {
            return $"{Number}: {Origin} -> {Destination}";
        }
    }
}