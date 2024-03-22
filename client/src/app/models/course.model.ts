export enum LearningMode {
    Frontal = 1,
    Zoom = 2
}
export class Course{
    static index=0;
    id:number=0;
    name:string="";
    idCategory:number=0;
    numLessons:number=0;
    startDate:Date=new Date();
    syllabus: string[]=[];
    learningMode:LearningMode=LearningMode.Zoom;
    idLecturer:number=0;
    image:string="";
    constructor(
        name:string,
        idCategory:number,
        numLessons:number,
        startDate:Date,
        Syllabus: string[],
        learningMode:LearningMode,
        idLecturer:number,
        image:string) {
        
}
}