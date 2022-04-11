namespace WiredBrainCoffee.StackApp
{
    // T is a generic type parameter that you need to pass to the SimpleStack class when you use it
    // You should either call it T or at least start with T if you want to give it a more spoecific name (like TItem)
    // You read the class like "SimpleStack of T"
    public class SimpleStack<T>
    {
        private T[] _items;
        private int _currentIndex = -1;
        public SimpleStack()
        {
            _items = new T[10];
        }

        public int Count()
        {
            return _currentIndex + 1;
        }

        public void Push(T item)
        {
            _items[++_currentIndex] = item;
        }

        public T Pop()
        {
            return _items[_currentIndex--];
        }
    }

    public class SimpleStackDouble
    {
        private readonly double[] _items;
        private int _currentIndex = -1;

        // Constructor
        public SimpleStackDouble() => _items = new double[10];

        // Count method
        public int Count() => _currentIndex + 1;

        // Push method
        public void Push(double item) => _items[++_currentIndex] = item;

        // Pop method
        public double Pop() => _items[_currentIndex--];
    }

    public class SimpleStackString
    {
        private readonly string[] _items;
        private int _currentIndex = -1;

        // Constructor
        public SimpleStackString() => _items = new string[10];

        // Count method
        public int Count() => _currentIndex + 1;

        // Push method
        public void Push(string item) => _items[++_currentIndex] = item;

        // Pop method
        public string Pop() => _items[_currentIndex--];
    }

    public class SimpleStackObject
    {
        private readonly object[] _items;
        private int _currentIndex = -1;

        public SimpleStackObject()
        {
            _items = new object[10];
        }

        public int Count()
        {
            return _currentIndex + 1;
        }

        public void Push(object item)
        {
            _items[++_currentIndex] = item;
        }

        public object Pop()
        {
            return _items[_currentIndex--];
        }
    }
}