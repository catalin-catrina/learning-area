namespace _13UnitTesting.PersonClassses
{
    public class PersonManager
    {
        public Person CreatePerson(string first, string last, bool isSupervisor)
        {
            Person ret = null;
            
            if (!string.IsNullOrEmpty(first))
            {
                if (isSupervisor)
                {
                    ret = new Supervisor(first ,last);
                }
                else
                {
                    ret = new Employee(first, last);
                }
            }

            return ret;
        }

        public List<Person> GetPeople()
        {
            List<Person> people = new List<Person>();

            people.Add(new Person() { FirstName = "Paul", LastName = "B" });
            people.Add(new Person() { FirstName = "Andrei", LastName = "D" });
            people.Add(new Person() { FirstName = "Michael", LastName = "S" });

            return people;
        }

        public List<Person> GetSupervisors()
        {
            List<Person> people = new List<Person>();

            people.Add(CreatePerson("Paul", "Sheriff", true));
            people.Add(CreatePerson("Mick", "Krasowski", true));

            return people;
        }

        public List<Person> GetEmployees()
        {
            List<Person> people = new List<Person>();

            people.Add(CreatePerson("Steve", "Biso", false));
            people.Add(CreatePerson("John", "K", false));
            people.Add(CreatePerson("Moho", "Schmidt", false));

            return people;
        }

        public List<Person> GetSupervisorsAndEmployees()
        {
            List<Person> people = new();

            people.AddRange(GetEmployees());
            people.AddRange(GetSupervisors());

            return people;
        }
    }
}
