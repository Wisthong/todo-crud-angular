import { Component, OnDestroy, OnInit } from '@angular/core';
import { People } from '@modules/home/models/people';
import { PeopleService } from '@modules/home/service/people.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.scss'],
})
export class HomePagesComponent implements OnInit, OnDestroy {
  listPeople: People[] = [];
  listObservers$ = Array<Subscription>();
  constructor(
    private readonly peopleSvc: PeopleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const observer1$ = this.peopleSvc.getAllPeople().subscribe((resOk) => {
      this.listPeople = resOk;
    });
    this.listObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach((e) => e.unsubscribe());
    console.log('🟠');
  }

  deletePeople(id: string | undefined) {
    const observer2$ = this.peopleSvc.deletePeople(id).subscribe(
      (resOk) => {
        this.toastr.success(
          'Se elimino la tarea de manera exitosa',
          'Eliminación de tarea 👍'
        );
        const arrayTemp = this.listPeople.filter((actual) => actual.id != id);
        this.listPeople = [...arrayTemp];
      },
      (resFail) => {
        this.toastr.error(
          'No se pudo eliminar tarea, por favor intenta más tarde',
          '😡😡😡Error😡😡😡'
        );
      }
    );
    this.listObservers$ = [observer2$];
  }
}
