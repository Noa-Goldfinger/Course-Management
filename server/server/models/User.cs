﻿namespace server.models
{
    public class User
    {
        static int index = 0;
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public User(string userName, string address, string email, string password)
        {
            Id = index++;
            Name = userName;
            Address = address;
            Email = email;
            Password = password;
        }
        public User()
        {
            
        }
    }
}
