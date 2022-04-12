namespace _7Records
{
    class Program
    {
        static void Main(string[] args)
        {
            // When we don't pass any value into the constructor, all the property values in the new object get the default values, in this case an empty string
            var pluralsightCourse = new Course();

            // We can then change the property values in the object like this
            pluralsightCourse.Name = "Working with C# Records";
            pluralsightCourse.Author = "Roland Guijt";

            // a class is a reference type, which means that when we instantiate a class into an object / variable, like in this case pluralsightcourse, 
            // it doens't contain the object, it's just referring to an object that resides in memory
            // this means that when we assign the value of pluralsightCourse to anotherCourse, anotherCourse gets the reference to that same object in memory 
            // if we change the values in the object, it will reflect to both variables because they both point to it
            var anotherCourse = pluralsightCourse;
            Console.WriteLine(pluralsightCourse.Name);
            Console.WriteLine(anotherCourse.Name);

            // Reference types are more efficient when passing them around in your application because copying isn't necessary
            // For example here when we pass in pluralsightCourse into the PrintCourse method, we don't pass a copy of the variable, we pass the variable itself which
            // contains the reference to the object itself
            PrintCourse(pluralsightCourse);

            // records are also reference types like classes, which means that variables only hold references to the objects instantiated by them
            // declaring a record is similar to declaring a class, but we can't instantiate them with a parameterless constructor like we can do with classes
            // this record is called a positiona record because we pass in the arguments in the order defined in the record itself
            var classroomCourse = new CourseRecord("Working with C# Records", "Roland Guijit");

            // a record instance is immutable, we can't change the properties of a record after it has been instantiated
            classroomCourse.Name = "Another name";
        }

        static void PrintCourse(Course course)
        {
            Console.WriteLine(course.Name);
        }
    }

    public class Course
    {
        public string Name { get; set; }
        public string Author { get; set; }
    }

    // like a class, a record takes properties, one way to declare properties is by using this syntax
    public record CourseRecord(string Name, string Author);
}
