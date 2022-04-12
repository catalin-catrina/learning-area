namespace _7Records
{
    class Program
    {
        static void Main(string[] args)
        {
            // CLASSES - REFERENCE TYPE
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

            var name = pluralsightCourse.Name;
            var author = pluralsightCourse.Author;

            // Deconstructing is a better way of doing it because we specify the properties in one go
            // Records have a deconstructor by default, class do not, so we have to define one if we want to do the same thing with a class
            // This works now because we defined a deconstructor called Deconstruct in the class
            var (name2, author2) = pluralsightCourse;

            // RECORDS - REFERENCE TYPE BUT IMMUTABLE
            // records are also reference types like classes, which means that variables only hold references to the objects instantiated by them
            // declaring a record is similar to declaring a class, but we can't instantiate them with a parameterless constructor like we can do with classes
            // this record is called a positiona record because we pass in the arguments in the order defined in the record itself
            var classroomCourse = new CourseRecord("Working with C# Records", "Roland Guijit");

            // in a positional record, likeCourseRecord is, we get the values back in the order we declared the variables
            // public record CourseRecord(string Name, string Author); 
            // so Name first and Author second, this means that when we destructure we catch the Name variable first, and Author second
            var (name3, author3) = classroomCourse;

            // a record instance is immutable, we can't change the properties of a record after it has been instantiated
            //classroomCourse.Name = "Another name";
            // the way in which we can change properties is to create a new instance and change one or more properties using the with keyword
            // this creates a new instance in memory, a new variable pointing to a completely different object instance
            var anotherClassRoomCourse = classroomCourse with { Name = "C# looks neat" };

            // Record with body
            CourseRecordWithBody coolCourse = new CourseRecordWithBody("Udemy C# Course", "cool author");
            coolCourse.GetTitle();

            // Record with body which contains both positional properties and custom properties
            var title = coolCourse.Title;
            Console.WriteLine(title);

            // Record with no positional properties
            var amazingCourse = new CourseRecordWithoutPositionalProperties();

            // Record with both positional props and custom props without custom constructor
            // we need an object initializer to initialzie the custom properties
            var supercourse = new CourseRecordWithPosPropAndCustomProps("Coursera course")
            {
                Author = "Micutzu"
            };

            // Record with both positional props and custom props without custom constructor
            // if we define a custom constructor inside the record, we can get rid of the object initializer and use the overloaded constructor instead
            var supercourse2 = new CourseRecordWithoutPosPropAndCustomPropsAndCustomConstructor("edx course", "nice author");

            // Inheritance with records
            RecordOne course = new RecordTwo("nicename", "niceauthor", 15);

            // coursse2 is of the type RecordOne
            var course2 = course with { Name = "anothernicename" };

            // course2 is of the type RecordOne so we can't access the "Duration" property directly, but we can cast it into a RecordTwo type and thena access it
            var castcourse2 = (RecordTwo)course2;
            var duration = castcourse2.Duration;
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

        public void Deconstruct(out string name, out string author)
        {
            name = Name;
            author = Author;
        }
    }

    // like a class, a record takes properties, one way to declare properties is by using this syntax
    public record CourseRecord(string Name, string Author);

    // Properties defined in the constructor (string Name, string Author) are called positional properties
    public record CourseRecordWithBody(string Name, string Author)
    {
        // We can have methods in a Record
        public void GetTitle()
        {
            Console.WriteLine($"{Name} - {Author}");
        }

        // We can also have custom properties
        public string Title
        {
            get
            {
                return $"{Name} - {Author}";
            }
        }
    }

    public record CourseRecordWithoutPositionalProperties()
    {
        // You can write your own custom constructor with parameters in a record but it must call the constructor that is already present using this
        // it's used to make sure any positional properties are correctly initialized
        // a deconstructor is only generated for the positional properties, so you can't use the existing one, but you can create a deconstructor yourself
        public CourseRecordWithoutPositionalProperties (string name, string author) : this()
        {
            Name = name;
            Author = author;
        }

        // Custom properties are "set" using the init keyword to mentain immutability, we can still use "set", but shouldn't do so with records
        public string Name { get; init; }
        public string Author { get; init; }

        public string Title
        {
            get { return $"{Name} - {Author}"; }
        }
    }

    public record CourseRecordWithPosPropAndCustomProps (string Name)
    {
        public string Author { get; init; }
    }

    public record CourseRecordWithoutPosPropAndCustomPropsAndCustomConstructor (string Name)
    {
        public CourseRecordWithoutPosPropAndCustomPropsAndCustomConstructor(string name, string author) : this(name)
        {
            Author = author;
        }

        public string Author { get; init; }
    }

    // Inheritance with records
    public record RecordOne(string Name, string Author);
    public record RecordTwo(string Name, string Author, int Duration) : RecordOne(Name, Author);
}
