namespace _8ArraysAndCollections___StacksAndQueues
{
    class Program
    {
        static void Main(string[] args)
        {
            BusStop busStop = new BusStop();
            Bus bus = new Bus();

            for (int i = 0; i < 6; i++)
            {
                busStop.PersonArrive(PassengerGenerator.CreatePassenger());
            }
            Console.WriteLine();
            busStop.BusArrive(bus);
            bus.ArriveAtTerminus();
        }
    }
}
