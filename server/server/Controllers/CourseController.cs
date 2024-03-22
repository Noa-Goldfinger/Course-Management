using Microsoft.AspNetCore.Mvc;
using server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        public static List<Course> courses =new List<Course> {new Course("AAA",1,10,new DateTime(),new string[] {"aaa"},LearningMode.Frontal,1, "https://dprint.co.il/wp-content/uploads/2023/04/%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%9E%D7%9E%D7%95%D7%A1%D7%92%D7%A8%D7%AA-FINEART.jpg") };// new List<Course> { new Course("AAA", 1, 10, new DateOnly(), new string[] { "aaa" }, LearningMode.Frontal, 1, "image.png"),
        // GET: api/<CourseController>
        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return courses;
        }

        // GET api/<CourseController>/5
        [HttpGet("{id}")]
        public Course Get(int id)
        {
            var course= courses.Find(x=>x.Id==id);
            if(course!=null)
                return course;
            return null;
        }

        // POST api/<CourseController>
        [HttpPost]
        public Course Post([FromBody] Course value)
        {
            courses.Add(value);
            return value;
        }

        // PUT api/<CourseController>/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] Course value)
        {
            var course=courses.Find(x=>x.Id==id);
            if (course != null)
            {
                course.IdLecturer = value.IdLecturer;
                course.Image=value.Image;
                course.Name=value.Name;
                course.NumLessons=value.NumLessons;
                course.startDate=value.startDate;
                course.IdCategory=value.IdCategory;
                course.LearningMode=value.LearningMode;
                course.Syllabus=value.Syllabus;
                return true;
            }
            return false;
        }

        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var course = courses.Find(x => x.Id == id);
            if (course != null)
            {
                courses.Remove(course);
            }

        }
    }
}
