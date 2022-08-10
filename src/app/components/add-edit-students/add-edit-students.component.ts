import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-edit-students',
  templateUrl: './add-edit-students.component.html',
  styleUrls: ['./add-edit-students.component.css'],
})
export class AddEditStudentsComponent implements OnInit {
  title: string;
  form: FormGroup;
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private _studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      identification: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(13)]],
      birthdate: ['', [Validators.required]],
      address: [
        '',
        [
          Validators.pattern('[a-zA-Z0-9 ]*'),
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      active: [''],
    });
    this.title = 'Add';
    this.id = aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getStudent();
  }

  onSubmit(): void {
    const { identification, name, surname, email, phone, birthdate, address } =
      this.form.value;
    if (this.id === undefined) {
      this.saveStudent(
        identification,
        name,
        surname,
        email,
        phone,
        birthdate,
        address
      );
    } else {
      this.updateStudent(
        identification,
        name,
        surname,
        email,
        phone,
        birthdate,
        address,
        this.id
      );
    }
  }

  get angForm(): any {
    return this.form.controls;
  }

  getStudent() {
    if (this.id !== undefined) {
      this._studentService.getStudent(this.id).subscribe((data) => {
        const {
          identification,
          name,
          surname,
          email,
          phone,
          address,
          birthdate,
        } = data;
        this.form.patchValue({
          identification,
          name,
          surname,
          email,
          phone,
          address,
          birthdate,
        });
      });
    }
  }

  saveStudent(
    identification: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    birthdate: Date,
    address: string
  ): void {
    const student: Student = {
      identification: identification,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      birthdate: birthdate,
      address: address,
    };

    this._studentService.addStudent(student).subscribe(
      (data) => {
        /* redirect to list */
        this.toastr.success('Student added successfully', 'Success', {
          timeOut: 3000,
        });
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error', 'Ooops...', { timeOut: 3000 });
      }
    );
  }

  updateStudent(
    identification: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    birthdate: Date,
    address: string,
    id: number
  ) {
    const student: Student = {
      identification: identification,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      birthdate: birthdate,
      address: address,
    };

    this._studentService.editStudent(id, student).subscribe((data) => {
      /* redirect to list */
      this.toastr.success('Student updated successfully', 'Success', {timeOut: 3000});
      this.router.navigate(['/']);
    }, error=>{
      console.log(error);
      this.toastr.error('Error', 'Ooops...', { timeOut: 3000 });
    });
  }
}
