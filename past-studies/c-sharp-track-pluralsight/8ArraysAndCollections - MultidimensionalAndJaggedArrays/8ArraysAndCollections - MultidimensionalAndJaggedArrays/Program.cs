namespace _8ArraysAndCollections___MultidimensionalAndJaggedArrays
{
    class Program
    {
        static void Main(string[] args)
        {
            BusRouteRepository repo = new BusRouteRepository();

            BusTimes times5 = repo.BusTimesRoute5;
            BusRoute routes5 = times5.Route;

            for (int i = 0; i < routes5.Cities.Length; i++)
            {
                Console.Write(routes5.Cities[i].PadRight(12));

                //for (int j = 0; j < times5.Times.GetLength(0); j++)
                //{
                //    Console.Write(times5.Times[i, j] + " ");
                //}
                foreach(string time in times5.Times[i])
                {
                    Console.Write(time + " ");
                }
                Console.WriteLine();
            }
        }
    }
}