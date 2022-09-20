import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FormPageComponent } from './components/form-page/form-page.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterPageComponent } from './components/footer-page/footer-page.component';


@NgModule({
  declarations: [
    FormPageComponent,
    ListPageComponent,
    HomePagesComponent,
    NavbarComponent,
    FooterPageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
