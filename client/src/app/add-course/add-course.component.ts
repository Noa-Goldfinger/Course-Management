import { DateOnlyPipe } from 'src/date-pipe.pipe';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../models/course.model';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../models/category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit{
  course:Course;
  courseId: number;
  package:Course;
  isEdit: boolean;
  
  categories: Category[] = [];

   courseForm: FormGroup;
  constructor(private _courseService: CourseService,private _router: Router, private _categoryService:CategoryService,private _route: ActivatedRoute) {                     
    if(!this.isEdit){
      this.prop();
    }
  }
  prop(){
    console.log(this.course?.idCategory);
    
    this.courseForm = new FormGroup({
      name: new FormControl(this.course?.name || '', [Validators.required, Validators.minLength(2)]),
      startDate: new FormControl(this.course?.startDate || '', [Validators.required]),
      image: new FormControl(this.course?.image || '', [Validators.required]),
      learningMode:new FormControl(this.course?.learningMode|| '',[Validators.required]),
      idCategory:new FormControl(this.course?.idCategory,[Validators.required])
    });
  }
  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    )
    if (this._route.snapshot.queryParams) {
      this._route.queryParams.subscribe(params => {
      this.courseId=+params['id'];
      this.isEdit=params['isEdit'];
      }
     );
     this._courseService.getCourseById(this.courseId).subscribe(
      (course: Course) => {
        this.course = course;
    this.course.startDate = new DateOnlyPipe().transform(this.course.startDate);
    console.log(this.course?.idCategory);
      this.prop();
      this.course.syllabus.forEach((syllabusItem: string) => {
        this.inputs.push(syllabusItem);
      });
    
      console.log('Inputs after adding syllabus items:', this.inputs);
      },
      error => {
        console.error('Error fetching course:', error);
      }
    )}
  }
  
  inputs: string[] = [""];
   l:number=this.inputs.length;
  onInput(event: Event, index: number): void {
   
    const target = event.target as HTMLInputElement;
    let value = target.value.trim();
 
    if (value && index === this.inputs.length-1 ) {
      this.inputs.push(value);
    } else if (!value && index < this.inputs.length - 1) {
      this.inputs.splice(index + 1, 1);
     }
  }
  saveNewCourse(){
    let idCourse;
    if(!sessionStorage.getItem('userData'))
    {
    Swal.fire('Error', 'You are not logged in', 'error');
    this._router.navigate(['/courses']);
    return;
    }
    if(this.isEdit)
    {
      idCourse=this.courseId;
    }
    else idCourse=Course.index++
    this.package={
      id:idCourse,
      name: this.courseForm.value.name,
      idCategory: +this.courseForm.value.idCategory,
      numLessons: this.inputs.length-1,
      startDate: this.courseForm.value.startDate,
      syllabus:this.inputs.slice(1),
      learningMode: +this.courseForm.value.learningMode,
      idLecturer:JSON.parse(sessionStorage.getItem('userData')).id,
      image: this.courseForm.value.image
     };
     
       if(!this.isEdit)
      this._courseService.saveCourse(this.package).subscribe(
          (response: any) => {
            console.log("Response from saveCourse:", response);
            if (response) {
              Swal.fire("Good job!", "The course was saved successfully!!!", "success");
              this._router.navigate(['/courses']);
            } else {
              Swal.fire('Error', 'There was an error saving the course', 'error');
            }
          },
          error => {
            console.error("Error saving course:", error);
            Swal.fire('Error', 'There was an error saving the course', 'error');
          }
        );
        else {
          this._courseService.updateCourse(this.package).subscribe(
            (response: any) => {
              console.log("Response from saveCourse:", response);
              if (response) {
                Swal.fire("Good job!", "The course was updated successfully!!!", "success");
                this._router.navigate(['/courses']);
              } else {
                Swal.fire('Error', 'There was an error updating the course', 'error');
              }
            },
            error => {
              console.error("Error updating course:", error);
              Swal.fire('Error', 'There was an error updating the course', 'error');
            }
          );
        }
  }
  cancel(){
    Swal.fire("All right", "The course update was canceled", "success");
    this._router.navigate(['/courses']);
  }
}


