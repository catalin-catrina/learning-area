using System;

namespace MyUtilities
{
    // It's common practice to have a class per file and have it have the same name as the file

    // We say that public methods are part of the interface of the class
    // Public methods are meant to be allowed access from outside the class
    // Private methods are meant to not allow access from outside the class, online inside it

    // There are also other access modifiers other than "public" or "private", which are more specialized
    // for example "internal" means that a method is visible to any class inside the same assembly, but not from other assemblies
    // there are more access modifiers but you usually just learn them as you need them, public and private are by far the most used
    class WeatherUtilities
    {
        public static float FahrenheitToCelsius(float temperatureFahrenheit)
        {
            return (float)((temperatureFahrenheit - 32) / 1.8f);
        }

        public static float CelsiusToFahrenheit(float temperatureCelsius)
        {
            return (float)(temperatureCelsius * 1.8f + 32);
        }

        // Methods in C# are private by default unless we mention them to be public, but we can of course also make them explicitly private
        private static float ComfortIndex(float temperatureFahrenheit, float humidityPercent)
        {
            return (temperatureFahrenheit + humidityPercent) / 4;
        }

        public static void Report(string location, float temperatureCelsius, float humidity)
        {
            var temperatureFahrenheit = CelsiusToFahrenheit(temperatureCelsius);
            // Console.WriteLine("Comfort index for: " + location + ": " + ComfortIndex(temperatureFahrenheit, humidity));
            // Or we can write it like this, as an interpolated string ${}, similar to JavaScript
            Console.WriteLine($"Comfort index for: {location}: {ComfortIndex(temperatureFahrenheit, humidity)}");
        }
    }
}
