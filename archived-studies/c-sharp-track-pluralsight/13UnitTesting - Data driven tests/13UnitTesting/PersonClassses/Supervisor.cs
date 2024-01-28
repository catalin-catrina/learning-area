namespace _13UnitTesting.PersonClassses
{
    public class Supervisor : Person
    {
        public List<Employee> Employees { get; set; }

        public Supervisor(string first, string last)
        {
            FirstName = first;
            LastName = last;
        }
    }
}
