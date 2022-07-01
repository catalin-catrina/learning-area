using System.ComponentModel.DataAnnotations.Schema;

namespace ContosoUniversity.Models
{
    public class Course
    {
        // The DatabaseGenerated attribute allows the app to specify the primary key rather than having the database generate it.
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CourseID { get; set; }
        public string Title { get; set; }
        public int Credits { get; set; }

        // The Enrollments property is a navigation property. A Course entity can be related to any number of Enrollment entities.
        public ICollection<Enrollment> Enrollments { get; set; }

    }
}
