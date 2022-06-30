 namespace ContosoUniversity.Models
{
    public class Student
    {
        // The ID property becomes the primary key column of the database table that corresponds to this class. By default, EF Core interprets a property that's named ID or classnameID as the primary key. So the alternative automatically recognized name for the Student class primary key is StudentID
        public int ID { get; set; }
        public string LastName { get; set; }
        public string FirstMidName { get; set; }
        public DateTime EnrollmentDate { get; set; }

        /* The Enrollments property is a navigation property. Navigation properties hold other entities that are related to this entity. In this case, the Enrollments property of a Student entity holds all of the Enrollment entities that are related to that Student. For example, if a Student row in the database has two related Enrollment rows, the Enrollments navigation property contains those two Enrollment entities.

        In the database, an Enrollment row is related to a Student row if its StudentID column contains the student's ID value. For example, suppose a Student row has ID=1. Related Enrollment rows will have StudentID = 1. StudentID is a foreign key in the Enrollment table.

        The Enrollments property is defined as ICollection<Enrollment> because there may be multiple related Enrollment entities. Other collection types can be used, such as List<Enrollment> or HashSet<Enrollment>. When ICollection<Enrollment> is used, EF Core creates a HashSet<Enrollment> collection by default. 
        */
        public ICollection<Enrollment> Enrollments { get; set; }
    }
}
