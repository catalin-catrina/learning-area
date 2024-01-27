// System is the most useful namespace in all of .NET
// .NET comes with many ready-to-use core libraries, and one of them is System, that contains the most important classes
// one of those classes is the Console class, that gives us methods to input and output data from a program
using System;

// We set WeatherUtilities to be an alias for MyUtilities.WeatherUtilities, so that we don't have to specify the namespace when using the class
// using WeatherUtilities = MyUtilities.WeatherUtilities;

// or we can just import the entire namespace, common practice
using MyUtilities;

namespace MyFirstProgram
{
    class CheckComfort
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Where should we go in May?");
            WeatherUtilities.Report("San Francisco", WeatherUtilities.FahrenheitToCelsius(65), 73);
            WeatherUtilities.Report("Denver", WeatherUtilities.FahrenheitToCelsius(77), 55);

            // We need to mention the namespace ("MyUtilities") if we don't import it in the file 
            // MyUtilities.WeatherUtilities.Report("Bologna", 23, 65);
            WeatherUtilities.Report("Bologna", 23, 65);
        }
    }
}