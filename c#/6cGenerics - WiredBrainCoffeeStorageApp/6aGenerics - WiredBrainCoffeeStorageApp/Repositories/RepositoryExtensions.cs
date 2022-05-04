using _6cGenerics___WiredBrainCoffeeStorageApp.Entities;

namespace _6cGenerics___WiredBrainCoffeeStorageApp.Repositories
{
    public static class RepositoryExtensions
    {
        // adding the "this" keyword before the first parameter makes the AddBatch method an extension method for IRepository<T> instances
        public static void AddBatch<T>(this IRepository<T> repository, T[] items) where T : IEntity
        {
            foreach (var organization in items)
            {
                repository.Add(organization);
            }
            repository.Save();
        }
    }
}
