import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditStudentsComponent } from './components/add-edit-students/add-edit-students.component';
import { ListStudentsComponent } from './components/list-students/list-students.component';

const routes: Routes = [
  { path: '', component: ListStudentsComponent },
  { path: 'add', component: AddEditStudentsComponent },
  { path: 'edit/:id', component: AddEditStudentsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
