using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _9ExtensionMethods
{
    public class Celsius
    {
        private TemperatureConverter _converter;

        public Celsius(double celsius)
        {
            _converter = new TemperatureConverter(celsius);
        }

        public double Fahrenheit => _converter.ToFahrenheit();
        public double Romer => _converter.ToRomer();
    }
}
