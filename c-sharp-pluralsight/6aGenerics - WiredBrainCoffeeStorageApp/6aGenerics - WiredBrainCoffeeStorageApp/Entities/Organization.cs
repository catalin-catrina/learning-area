namespace _6aGenerics___WiredBrainCoffeeStorageApp.Entities
{
    public class Organization : EntityBase
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public override string ToString() => $"Id: {Id}, Name: {Name}";
    }
}
