﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _8ArraysAndCollections___MultidimensionalAndJaggedArrays
{
    public class BusRouteRepository
    {
        private BusRoute[] _allRoutes;
        public BusTimes BusTimesRoute5 { get; }

        public BusRouteRepository()
        {
            _allRoutes = new BusRoute[]
            {
                new BusRoute(40, new string[] {"Morecambe", "Lancaster", "Garstang", "Preston"}),
                new BusRoute(42, new string[] {"Lancaster", "Garstang", "Blackpool"}),
                new BusRoute(100, new string[] {"University", "Lancaster", "Morecambe"}),
                new BusRoute(555, new string[] {"Lancaster", "Carnforth", "Kendal", "Windermere", "Keswick"}),
                new BusRoute(5, new string[] {"Overton", "Morecambe", "Carnforth"})
            };

            // Multidimensional Array
            string[,] timesRoute5 =
            {
                { "15:40", "16:40", "17:40", "18:40" },
                { "16:08", "17:08", "18:08", "19:08"},
                { "16:35", "17:35", "18:35", "19:35" }
            };

            // Jagged Array
            // multiple square brackets next to each other tells the compiler that this is a jagged array
            // jagged array = array whose elements are also arrays, and each inner-array (index) can have a variable type
            string[][] timesRoute55 =
            {
                new string[] { "15:40", "16:40", "17:40", "18:40", "19:40" },
                new string[] { "16:08", "17:08", "18:08", "19:08", "20:08"},
                new string[] { "16:35", "17:35", "18:35", "19:35" }
            };

            //BusTimesRoute5 = new BusTimes(Array.Find(_allRoutes, x => x.Number == 5), timesRoute5);
            BusTimesRoute5 = new BusTimes(Array.Find(_allRoutes, x => x.Number == 5), timesRoute55);
        }

        public BusRoute[] FindBusesTo(string location)
        {
            return Array.FindAll(_allRoutes, route => route.Serves(location));
        }
    }
}
