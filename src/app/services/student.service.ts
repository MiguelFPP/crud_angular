import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  url: string = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${this.url}students`);
  }

  getStudent(id: number): Observable<any> {
    return this.http.get(`${this.url}students/${id}`);
  }

  addStudent(student: Student): Observable<any> {
    return this.http.post(`${this.url}students`, student);
  }

  changeStatus(id: number): Observable<any> {
    return this.http.put(`${this.url}students/${id}/status`, {});
  }

  editStudent(id: number, student: Student): Observable<any> {
    return this.http.put(`${this.url}students/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.url}students/${id}`);
  }
}
