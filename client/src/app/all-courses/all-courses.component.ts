import { CategoryService } from './../category.service';
import { Category } from './../models/category.model';
import { Course, LearningMode } from './../models/course.model';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit {

  constructor( private _courseService: CourseService, private _categories:CategoryService, private _router:Router) {}

  courses:Course[] = [];
  coursesToShow:Course[] = [];
  categories:Category[]=[];
  categoryName:string;
  categoryId:number;
  learning?:string[]=["Frontal","Zoom"];

  changeCourseName(e:any){
    this.coursesToShow=this.courses.filter(x=>x.name==e.target.value||e.target.value=="")
  }
  learningWay(e:any){
    let lW=this.learning?.indexOf(e.target.value);
      this.coursesToShow=this.courses.filter(x=>e.target.value==""||x.learningMode==(lW+1))
    }
  select(e:any){
    this.categoryName=e.target.value;
    this.categories.forEach(element => {
      if(element.name==this.categoryName){
        this.categoryId=element.id;
      }
      this.coursesToShow=this.courses.filter(x=>this.categoryName==""||x.idCategory==this.categoryId)
    });
  }
  ngOnInit(): void {
    this._courseService.getAllCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
        this.coursesToShow = data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
    this._categories.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}