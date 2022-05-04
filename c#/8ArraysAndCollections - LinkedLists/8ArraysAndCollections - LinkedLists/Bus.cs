using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _8ArraysAndCollections___LinkedLists
{
    public class Bus
    {
        public const int Capacity = 5;
        public int Space { get => Capacity - _passengers.Count; }
        private List<Passenger> _passengers = new List<Passenger>();

        public bool Load(Passenger passenger)
        {
            if (Space < 1) return false;

            // Linked lists hold references only to the first and last nodes
            // Add an item at the end of the linked list
            // There's also AddFirst() which adds an item at the beginning of the linked list
            _passengers.Add(passenger);
            Console.WriteLine($"{ passenger} got on board");
            return true;
        }

        public void ArriveAt(string place)
        {
            Console.WriteLine($"\r\nBus arriving at {place}");

            if (_passengers.Count == 0) return;

            // The First property gets you the first node of the linked list
            // LinkedListNode<T> represents a linked list node
            // LinkedListNode<T> has 3 properties: Next and Previous get the neighbouring nodes, and Value gets the actual item

            int index = _passengers.FindIndex(passenger => passenger.Destination == place);

            while ( index > -1)
            {
                Console.WriteLine($"{_passengers[index]} is getting off");
                _passengers.RemoveAt(index);
                index = _passengers.FindIndex(passenger => passenger.Destination == place);
            }


            Console.WriteLine($"{_passengers.Count} people left the bus");
        }
    }
}
