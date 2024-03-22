import { Lecturer } from './models/lecturer.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './models/user.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5207/api'; 

  constructor(private http: HttpClient) {}

  checkUserExists(name: string): Observable<boolean> {    
    return this.http.get<boolean>(`/api/User/${name}`);
  }
  checkIfUserLecturer(name: string): Observable<Lecturer> {
    return this.http.get<Lecturer>(`/api/Lecturer/${name}`);
  }


addUser(course: User):Observable<User>{
  console.log(course);
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<User>(`/api/User`, course, { headers }).pipe(
    catchError(this.handleError)
  );
}

authenticateUser(username: string, password: string): Observable<boolean> {

  return this.http.get<User>(`/api/User/${username}`).pipe(
    switchMap(user => {
      if (!user) {
        return of(false);
      }
      if (user.name === username && user.password === password) {
        return of(true);
      } else {
        return of(false); 
      }
    }),
    catchError(this.handleError)
   );
}

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
