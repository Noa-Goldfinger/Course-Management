using Microsoft.AspNetCore.Mvc;
using server.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static List<User> users = new List<User> { new User("aaa", "b", "c", "ddd") };
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return users;
        }
        
        // GET api/<UserController>/5
        [HttpGet("{name}")]
        public User Get(string name)
        {
            var user= users.Find(x=>x.Name == name);
            if(user != null) 
                return user;
            return null;
        }

        // POST api/<UserController>
        [HttpPost]
        public User Post([FromBody] User value)
        {
            users.Add(value);
            return value;
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User value)
        {
            var user=users.Find(x => x.Id == id);
            if(user != null)
            {
                user.Address = value.Address;
                user.Password = value.Password;
                user.Name = value.Name;
                user.Email= value.Email;
            }
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var user=users.Find(x=>x.Id == id);
            if(user != null) { users.Remove(user); }
        }
    }
}
