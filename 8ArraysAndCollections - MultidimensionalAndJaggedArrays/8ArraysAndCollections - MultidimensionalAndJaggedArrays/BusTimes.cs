namespace _8ArraysAndCollections___MultidimensionalAndJaggedArrays
{
    public class BusTimes
    {
        // Multidimensional array
        //public string[,] Times { get; }

        // Jagged array
        public string[][] Times { get; }

        public BusRoute Route { get; }

        //public BusTimes(BusRoute route, string[,] times)
        public BusTimes(BusRoute route, string[][] times)
        {
            Route = route;
            Times = times;
        }
    }
}