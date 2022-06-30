// EF Core interprets a property as a foreign key if it's named <navigation property name><primary key property name>. For example,StudentID is the foreign key for the Student navigation property, since the Student entity's primary key is ID. Foreign key properties can also be named <primary key property name>. For example, CourseID since the Course entity's primary key is CourseID.

using System.ComponentModel.DataAnnotations;

namespace ContosoUniversity.Models
{
    public enum Grade
    {
        A, B, C, D, F
    }

    public class Enrollment
    {
        // The EnrollmentID property is the primary key; this entity uses the classnameID pattern instead of ID by itself.
        public int EnrollmentID { get; set; }

        // The CourseID property is a foreign key, and the corresponding navigation property is Course. An Enrollment entity is associated with one Course entity.
        public int CourseID { get; set; }

        // The StudentID property is a foreign key, and the corresponding navigation property is Student. An Enrollment entity is associated with one Student entity, so the property contains a single Student entity.
        public int StudentID { get; set; }

        // The Grade property is an enum. The question mark after the Grade type declaration indicates that the Grade property is nullable. A grade that's null is different from a zero grade—null means a grade isn't known or hasn't been assigned yet.
        [DisplayFormat(NullDisplayText = "No grade")]
        public Grade? Grade { get; set; }

        public Course Course { get; set; }
        public Student Student { get; set; }
    }
}
