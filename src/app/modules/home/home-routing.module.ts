import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from './components/form-page/form-page.component';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';

const routes: Routes = [
  {
    path: '',
    component: HomePagesComponent,
    title: 'App Crud',
  },
  {
    path: 'forms',
    component: FormPageComponent,
    title: 'Create',
  },
  {
    path: 'forms/:id',
    component: FormPageComponent,
    title: 'Update',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
