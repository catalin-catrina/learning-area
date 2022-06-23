using System;

namespace _6dGenerics___WiredBrainCoffeeStorageApp
{
    class Program
    {
        static void Main(string[] args)
        {
            _ = new Container<string>();
            _ = new Container<string>();
            _ = new Container<int>();

            // The static member InstanceCount is created for every generic type that you define
            // This means that Container<string> is a different type than Container<int>
            Console.WriteLine($"Container<string>: {Container<string>.InstanceCount}"); // 2
            Console.WriteLine($"Container<int>: {Container<int>.InstanceCount}"); // 1
            Console.WriteLine($"Container<bool>: {Container<bool>.InstanceCount}"); // 0

            // If you want to know how many Container<T> instances were created, you need to create a non-generic class to inherit from
            // and keep track of the nr of instances there
            Console.WriteLine($"ContainerBase: {ContainerBase.InstanceCountBase}");

            Container<int> container = new Container<int>();
            container.PrintItem2<string>("Hello from a generic method inside a generic class");

            var result = Add(2, 3);
            Console.WriteLine($"2 + 3 = {result}");

            var result2 = Add(2.5, 3.9);
            Console.WriteLine($"2.5 + 3.9 = {result2}");
        }

        private static T Add<T>(T v1, T v2) where T : notnull
        {
            // We can't use mathematical operations with variables of a generic type
            // Instead, we need to use the dynamic keyword
            dynamic a = v1;
            dynamic b = v2;
            return a + b;
        }
    }

    class ContainerBase
    {
        public ContainerBase()
        {
            InstanceCountBase++;
        }

        public static int InstanceCountBase { get; set; }
    }

    class Container<T> : ContainerBase
    {
        public Container()
        {
            InstanceCount++;
        }
        public static int InstanceCount { get; set; }

        // Non-generic method in generic class
        public void PrintItem(T item)
        {
            Console.WriteLine($"Item: {item}");
        }

        // Generic method in generic class
        public void PrintItem2<TItem>(TItem item)
        {
            Console.WriteLine($"Item: {item}");
        }
    }
}