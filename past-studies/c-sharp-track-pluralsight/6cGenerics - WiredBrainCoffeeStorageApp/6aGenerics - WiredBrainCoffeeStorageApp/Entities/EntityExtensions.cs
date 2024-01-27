using System.Text.Json;

namespace _6cGenerics___WiredBrainCoffeeStorageApp.Entities
{
    // Method type parameters are defined like "public methodName<T>() and we can then use T as both the type of the method and as type of its parameters
    public static class EntityExtensions
    {
        public static T? Copy<T>(this T itemToCopy) where T : IEntity
        {
            var json = JsonSerializer.Serialize<T>(itemToCopy);
            return JsonSerializer.Deserialize<T>(json);
        }
    }
}
