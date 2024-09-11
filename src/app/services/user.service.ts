import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../app.component';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(apiUrl.apiUrl+"users", user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl.apiUrl + 'users');
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl.apiUrl}users/${userId}`);
  }

  updateUser(userId: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${apiUrl.apiUrl}users/${userId}`, updatedUser);
  }
  
}