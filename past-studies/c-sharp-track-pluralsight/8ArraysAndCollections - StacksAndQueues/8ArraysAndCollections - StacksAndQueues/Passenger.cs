using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _8ArraysAndCollections___StacksAndQueues
{
    public class Passenger
    {
        public string Name { get; init; }
        public string Destination { get; init; }
        public Passenger (string name, string destination)
        {
            Name = name;
            Destination = destination;
        }

        public override string ToString()
        {
            return $"{Name} to {Destination}";
        }
    }
}
