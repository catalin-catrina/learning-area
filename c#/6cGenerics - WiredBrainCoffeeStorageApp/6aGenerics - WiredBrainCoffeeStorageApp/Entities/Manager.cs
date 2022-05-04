namespace _6cGenerics___WiredBrainCoffeeStorageApp.Entities
{
    public class Manager : Employee
    {
        // we override the toString method from the base class (Employee) and add "manager" string to it
        public override string ToString() => base.ToString() + " (Manager)";
    }
}
