namespace server.models
{
    public enum LearningMode { Frontal =1, Zoom = 2 };
    public class Course
    {
        static int index = 0;
        public int Id { get; set; }
        public string Name { get; set; }
        public int IdCategory { get; set; }
        public int NumLessons { get; set; }
        public DateTime startDate { get; set; }
        public string[] Syllabus { get; set; }
        public LearningMode LearningMode { get; set; }
        public int IdLecturer { get; set; }
        public string Image { get; set; }
        public Course(string name,int catId,int amount, DateTime beginDate, string[]syllabus,LearningMode learningType,int lecturerId,string image)
        {
            Id = index++;
            Name = name;
            IdCategory = catId;
            NumLessons = amount;
            startDate = beginDate;
            Syllabus = syllabus;
            LearningMode = learningType;
            Id=lecturerId;
            Image = image;   
        }
        public Course()
        {
            
        }
    }
}
