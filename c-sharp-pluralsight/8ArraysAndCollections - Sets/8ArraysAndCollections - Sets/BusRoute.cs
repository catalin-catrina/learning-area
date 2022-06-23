namespace _8ArraysAndCollections___Sets
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

        public bool Serves(string location)
        {
            foreach(string city in Cities)
            {
                if (city == location) return true;
            }
            return false;
        }
    }
}