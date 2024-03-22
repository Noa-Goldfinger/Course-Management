import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { Category } from './../models/category.model';
import { Course, LearningMode } from './../models/course.model';
import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit{

course:Course;
categories:Category[];
today: Date = new Date();

constructor(private _categoryService:CategoryService,private _courseService:CourseService ,private _router:Router,private _route: ActivatedRoute){}

ngOnInit(){
  this._categoryService.getAllCategories().subscribe(
    (categories: Category[]) => {
      this.categories = categories;
    },
    error => {
      console.error('Error fetching categories:', error);
    }
  )
  this._route.paramMap.subscribe(params => {
    const courseId = params.get('id');
    if (courseId) {
     { 
    this._courseService.getCourseById(+courseId).subscribe(
      res=>this.course=res
      
    )
    }
    }})
}
isLecturersCourse():boolean{
  const storedDataAsStringIsLecturer = sessionStorage.getItem('isLecturer');
  const storedDataAsStringUser = sessionStorage.getItem('userData');
  const ifExist=JSON.parse(storedDataAsStringUser);
  if(ifExist)
  return ifExist.id==this.course.idLecturer&&JSON.parse(storedDataAsStringIsLecturer);
  return false;
}
getLearningModeName(mode: LearningMode): string {
  switch (mode) {
    case LearningMode.Frontal:
      return 'פרונטלי';
    case LearningMode.Zoom:
      return 'זום';
    default:
      return '';
  }
}

getCategoryName(id: number) {
  if (this.categories) {
    const category = this.categories.find(x => x.id === id);
    return category ? category.name : '';
  }
  return '';
}

getIcon(id: number) {
  if (this.categories) {
  const category = this.categories.find(x => x.id == id);
  console.log(category.iconRouting);
  console.log(category);
  
  return category ? category.iconRouting : 'default-icon';
  }
  return '';
}

getCurrentDate(): Date {
  return new Date();
}

editCourse(courseId: number | undefined) {
  this._router.navigate(['/addCourses'], { queryParams: { id: courseId , isEdit:true} });
}

isStartDateInWeek(startDate: any): boolean {
  if (!(startDate instanceof Date)) {
    startDate = new Date(startDate);
  }
  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  const isNextWeek = startDate.getTime() >= today && startDate.getTime() <= nextWeek;
  console.log(isNextWeek);

  return isNextWeek;
}
}
