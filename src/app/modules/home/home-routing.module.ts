import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';

const routes: Routes = [
  {
    path: '',
    component: HomePagesComponent,
    title: 'App Crud',
  },
  {
    path: 'forms',
    component: TodoFormComponent,
    title: 'Create',
  },
  {
    path: 'forms/:id',
    component: TodoFormComponent,
    title: 'Update',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
