using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _8ArraysAndCollections___StacksAndQueues
{
    public class BusStop
    {
        // In queues the first in is the first out
        private Queue<Passenger> _peopleWaiting = new Queue<Passenger>();

        public void PersonArrive(Passenger passenger)
        {
            // Add a person to the queue
            // In queues adding an item == enqueue; removing an item = dequeue
            _peopleWaiting.Enqueue(passenger);
            Console.WriteLine($"{passenger} queueing at bus stop");
        }

        public void BusArrive(Bus bus)
        {
            while (bus.Space > 0 && _peopleWaiting.Count > 0)
            {
                // Dequeue always removes the item that waited in the queue the longest
                // you can't pass it any parameter to choose which item to remove
                // Dequeue() returns the removed item
                Passenger passenger = _peopleWaiting.Dequeue();
                bus.Load(passenger);
            }
        }
    }
}
