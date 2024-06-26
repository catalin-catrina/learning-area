﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _8ArraysAndCollections___DisplayRoutes
{
    public class BusRoute
    {
        public int Number { get; }
        public string Origin { get; }
        public string Destination { get; }

        public BusRoute (int number, string origin, string destination)
        {
            Number = number;
            Origin = origin;
            Destination = destination;
        }

        public override string ToString()
        {
            return $"{Number}: {Origin} -> {Destination}";
        }
    }
}
