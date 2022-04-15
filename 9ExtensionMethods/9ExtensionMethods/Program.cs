namespace _9ExtensionMethods
{
    public interface IUnit
    {
        double Value { get; }
    }

    public sealed class TemperatureConverter : IUnit
    {
        public double Value { get; }
        public TemperatureConverter (double Value)
        {
            Value = Value;
        }

        public double ToFahrenheit() => Value * 9 / 5 + 32;
    }
}