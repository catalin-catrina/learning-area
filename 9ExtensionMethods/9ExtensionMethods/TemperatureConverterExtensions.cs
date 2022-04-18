using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _9ExtensionMethods
{
    // We cannot inherit from the TemperatureConverter class because it's sealed
    // And we cannot modify it since it's supposedly from a 3rd party library

    // The solution is to extend it using an extension method, which add new functionality to classes without having to touch the classes themselves
    // The way to create an extension method is to create a static method inside a static class, and use the "this" keyword on the first parameter in the static method
    public static class TemperatureConverterExtensions
    {
        public static double ToRomer(this TemperatureConverter temperature)
        {
            return temperature.Value * 21 / 40 + 7.5;
        }
    }
}
