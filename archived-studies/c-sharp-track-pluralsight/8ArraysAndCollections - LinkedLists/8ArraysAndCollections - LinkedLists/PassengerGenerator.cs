using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _8ArraysAndCollections___LinkedLists
{
    public class PassengerGenerator
    {
        private static int _count = 0;

        // Random is a type that generates random numbers
        private static Random _rnd = new Random();

        public static Passenger CreatePassenger()
        {
            string destination = _rnd.Next(2) == 0 ? "Lancaster" : "Morecambe";
            return new Passenger($"Person {++_count}", destination);
        }
    }
}
