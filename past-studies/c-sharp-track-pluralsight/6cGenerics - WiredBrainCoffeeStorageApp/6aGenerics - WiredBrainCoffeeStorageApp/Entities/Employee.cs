namespace _6cGenerics___WiredBrainCoffeeStorageApp.Entities
{
    public class Employee : EntityBase
    {
        public string? FirstName { get; set; }

        //public string StringEmployee() => $"Id: {Id}, FirstName: {FirstName}";
        public override string ToString() => $"Id: {Id}, FirstName: {FirstName}";
    }
}
