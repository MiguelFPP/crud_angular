import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent implements OnInit, OnDestroy {
  students: [];
  constructor(private _studentService: StudentService, private toastr:ToastrService) {
    this.students = [];
  }

  ngOnInit(): void {
    this.getStudents();
  }

  ngOnDestroy(): void {
    this.students = [];
  }

  getStudents(): void {
    this._studentService.getStudents().subscribe(
      (res) => {
        const { data } = res;
        this.students = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeStatus(id: number): void {
    this._studentService.changeStatus(id).subscribe(
      (data) => {
        this.getStudents();
        this.toastr.success('Student status changed successfully', 'Success',{timeOut: 3000});
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error changing student status', 'Ooops...', {timeOut: 3000});
      }
    );
  }

  deleteStudent(id: number): void {
    this._studentService.deleteStudent(id).subscribe(
      () => {
        this.getStudents();
        this.toastr.success('Student deleted successfully', 'Success');
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error deleting student', 'Ooops...');
      }
    );
  }
}
