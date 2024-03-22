import { Category } from './models/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuardsCheckEnd } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from './models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

   private apiUrl = 'http://localhost:5207/api'; // נדרש להשלמת הדוגמה, החלף בנתיב המתאים

    constructor(private http: HttpClient) {}

    getAllCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(`/api/Category`);
    }

}