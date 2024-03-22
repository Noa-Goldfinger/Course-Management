using Microsoft.AspNetCore.Mvc;
using server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {public static List<Category> categories = new List<Category> { new Category("Math", "http://hahacanvas.co.il/wp-content/uploads/2021/11/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%99%D7%A4%D7%95%D7%AA-%D7%9C%D7%94%D7%93%D7%A4%D7%A1%D7%94-12.jpg"), new Category("English", "http://hahacanvas.co.il/wp-content/uploads/2021/11/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%99%D7%A4%D7%95%D7%AA-%D7%9C%D7%94%D7%93%D7%A4%D7%A1%D7%94-12.jpg") };
        // GET: api/<CategoryController>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return categories;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            var cat = categories.Find(x => x.Id == id);
            return cat;
        }

        // POST api/<CategoryController>
        [HttpPost]
        public void Post([FromBody] Category value)
        {
            categories.Add(value);
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Category value)
        {
            var cat = categories.Find(x => x.Id == id);
            if (cat != null)
            {
                cat.IconRouting = value.IconRouting;
                cat.Name = value.Name;
            }
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var cat=categories.Find(x => x.Id == id);
            if (cat != null)
                categories.Remove(cat);
        }
    }
}
