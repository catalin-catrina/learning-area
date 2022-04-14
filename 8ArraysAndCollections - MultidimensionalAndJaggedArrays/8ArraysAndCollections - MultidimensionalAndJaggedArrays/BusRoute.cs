using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _8ArraysAndCollections___MultidimensionalAndJaggedArrays
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

        internal bool Serves(string location)
        {
            foreach (string city in Cities)
            {
                if (city == location) return true;
            }
            return false;
        }
    }
}
