using System;
using System.Collections.Generic;

namespace WiredBrainCoffee.StackApp
{
    class Program
    {
        // The problem with creating a type specifc class is that we need to create a class for every type we want (copy-paste <<< reusable code)
        // The problem with creating an object class is that we have to box and unbox value types back and forth into an object, and that we can pass any type into method
        // The solution is to create a generic class

        // The most known generic classes are in the System.Collections.Generic namespace:
        // List<T> (list of T class)
        // Queue<T> (queue of T class)
        // Stack<T> (stack of T class)
        // Dictionary<TKey, TValue> (generic dictionary class that has the 2 generic type parameters: Tkey and TValue) - example below -

        static void Main(string[] argc)
        {
            ExamplesOfListQueueStackDictionary();

            StackDoublesWithDoubleType();
            Console.WriteLine();
            StackStringsWithStringType();
            Console.WriteLine();
            StackDoublesWithObjectType();
            Console.WriteLine();
            StackStringsWithObjectType();
            Console.WriteLine();

            StackDoublesWithGenerics();
            Console.WriteLine();
            StackStringsWithGenerics();
        }

        private static void StackDoublesWithDoubleType()
        {
            SimpleStackDouble stack = new SimpleStackDouble();
            stack.Push(1.2);
            stack.Push(2.8);
            stack.Push(3.0);

            double sum = 0.0;

            while (stack.Count() > 0)
            {
                double item = stack.Pop();
                Console.WriteLine($"Item: {item}");
                sum += item;
            }

            Console.WriteLine($"Sum: {sum}");
        }

        private static void StackStringsWithStringType()
        {
            var stack = new SimpleStackString();
            stack.Push("WiredBrainCoffee");
            stack.Push("Pluralsight");
            stack.Push("Catalin"); 

            while (stack.Count() > 0)
            {
                string item = stack.Pop();
                Console.WriteLine($"Item: {item}");
            } 
        }

        private static void StackDoublesWithObjectType()
        {
            var stack = new SimpleStackObject();
            stack.Push(3.0);
            stack.Push(3.6);
            stack.Push(4.9);

            double sum = 0;

            while (stack.Count() > 0)
            {
                double item = (double)stack.Pop();
                sum += item; 
                Console.WriteLine($"Item: {item}");
            }

            Console.WriteLine($"Sum: {sum}");
        }

        private static void StackStringsWithObjectType()
        {
            var stack = new SimpleStackObject();
            stack.Push("WiredBrainCoffee");
            stack.Push("Pluralsight");
            stack.Push("Catalin");

            while (stack.Count() > 0)
            {
                object item = stack.Pop();
                Console.WriteLine($"Item: {item}");
            }
        }

        private static void StackDoublesWithGenerics()
        {
            var stack = new SimpleStack<double>();
            stack.Push(5.6);
            stack.Push(1.3);

            var sum = 0.0;

            while (stack.Count() > 0)
            {
                double item = stack.Pop();
                sum += item;
                Console.WriteLine($"Item: {item}");
            }
            Console.WriteLine($"Sum: {sum}");
        }

        private static void StackStringsWithGenerics()
        {
            var stack = new SimpleStack<string>();
            stack.Push("Ceau");
            stack.Push("Hello");

            while (stack.Count() > 0)
            {
                var item = stack.Pop();
                Console.WriteLine($"Item: {item}");
            }
        }

        private static void ExamplesOfListQueueStackDictionary()
        {
            // Dictionary
            var dictionary = new Dictionary<string, string>();

            // Stack
            var stack = new Stack<string>();

            // List
            var list = new List<string>();

            // Queue
            var queue = new Queue<string>();
        }
    }
}