import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuardsCheckEnd } from '@angular/router';
import { catchError, concatWith, Observable, throwError } from 'rxjs';
import { Course } from './models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

   private apiUrl = 'http://localhost:5207/api';

    constructor(private http: HttpClient) {}
    // constructor(private _http:HttpClient)
    // {

    // }
    // getCourses():Observable<Course[]>
    // {
    //     return this._http.get<Course[]>("/api/Course");
    // }
    getAllCourses(): Observable<Course[]> {
      return this.http.get<Course[]>("/api/Course");
    }
    saveCourse(course: Course):Observable<Course>{
      console.log(course);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<Course>("/api/Course", course, { headers }).pipe(
        catchError(this.handleError)
      );
    }
    getCourseById(id:Number):Observable<Course>{
      return this.http.get<Course>(`api/Course/${id}`);
    }
    
    updateCourse(course: Course): Observable<boolean> {
      return this.http.put<boolean>(`api/Course/${course.id}`, course);
    }
    private handleError(error: any) {
      console.error('An error occurred:', error);
      return throwError('Something went wrong, please try again later.');
    }
}