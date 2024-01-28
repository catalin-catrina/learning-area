namespace _9ExtensionMethods
{
    class Program
    {
        static void Main(string[] args)
        {
            Celsius temp = new Celsius(20);

            double fahrenheit = temp.Fahrenheit;
            double romer = temp.Romer;

            Console.WriteLine(fahrenheit);
            Console.WriteLine(romer);
        }
    }
}