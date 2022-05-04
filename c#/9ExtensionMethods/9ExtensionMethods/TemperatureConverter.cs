namespace _9ExtensionMethods
{
    public sealed class TemperatureConverter : IUnit
    {
        public double Value { get; }
        public TemperatureConverter (double value)
        {
            Value = value;
        }

        public double ToFahrenheit() => Value * 9 / 5 + 32;
    }
}