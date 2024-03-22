import { Lecturer } from './../app/models/lecturer.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/course.service';
import { Course } from 'src/app/models/course.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrl: './login.component.css'
})
export class LoginComponent {

    username: string = '';
    password: string = '';
    courseName:string='';
    lecturerId:number;
    errorMessage: string = '';
    isLecturerExist:boolean=false;
    
    constructor( private _userService: UserService, private _courseService:CourseService, private _router:Router) {}

  isLecturer() {
    this._userService.checkIfUserLecturer(this.username).subscribe(
      (response) => {
        if (response) {
          this.lecturerId=response.id;
          this.isLecturerExist = true;
        } else {
          this.errorMessage = 'שם המשתמש אינו קיים';
        }
      },
      (error) => {
        this.errorMessage = 'שגיאה בבדיקת שם המשתמש';
      }
    );  
  }
    onSubmit() {
      this._userService.checkUserExists(this.username).subscribe(
        (exists) => {
          if (exists) {
            this._userService.authenticateUser(this.username, this.password).subscribe(
              (authenticated) => {
                if (authenticated) {
                  if(this.isLecturerExist){
                    this._courseService.saveCourse({
                      id: Course.index++,
                      name: this.courseName, 
                      idCategory: 0,
                      numLessons: 0,
                      startDate: undefined,
                      syllabus: [],
                      learningMode: undefined,
                      idLecturer:this.lecturerId,
                      image: ''
                    }).subscribe((res)=>{
                      console.log(res);
                    },
                    (error)=>{console.log(error);}
                    );
                  }
                  sessionStorage.setItem('userData',  JSON.stringify(exists));
                  sessionStorage.setItem('isLecturer', JSON.stringify(this.isLecturerExist));
                  this._router.navigate(['/courses']); 
                } else {
                  this.errorMessage = 'סיסמה שגויה';
                }
              }
            );
          } else {
            this._router.navigate(['/register',this.username]);

          }
        }
      );
  }
}
