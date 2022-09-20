import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { People } from '@modules/home/models/people';
import { PeopleService } from '@modules/home/service/people.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent implements OnInit, OnDestroy {
  loginForm = this.fb.nonNullable.group({
    message: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    birth: ['', [Validators.required]],
  });

  id!: string | null;

  option = {
    title: 'Formulario de Crear',
    button: 'CREAR',
    classBtn: 'btn-primary',
  };

  listObservables$ = Array<Subscription>();

  constructor(
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private readonly peopleSvc: PeopleService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.option = {
        title: 'Formulario de Actualización',
        button: 'Actualizar',
        classBtn: 'btn-warning',
      };
      const observer1$ = this.peopleSvc
        .getOnePeople(this.id)
        .subscribe((resOk) => {
          this.loginForm.patchValue({
            name: resOk.name,
            lastname: resOk.lastname,
            birth: resOk.birth,
            message: resOk.message,
          });
        });
      this.listObservables$ = [observer1$];
    }
  }

  ngOnDestroy(): void {
    this.listObservables$.forEach((e) => e.unsubscribe());
    console.log('Unsubscription');
  }

  onSubmit() {
    if (this.id !== null) {
      //TODO: Update
      if (this.loginForm.valid) {
        const body: People = {
          name: this.loginForm.getRawValue().name,
          lastname: this.loginForm.getRawValue().lastname,
          birth: this.loginForm.getRawValue().birth,
          message: this.loginForm.getRawValue().message,
        };
        const observer2$ = this.peopleSvc.updatePeople(this.id, body).subscribe(
          (resOk) => {
            this.toastr.success(
              'Se actualizo la tarea de manera satisfatoria',
              'Actualización de Tarea👏'
            );
            setTimeout(() => {
              this.router.navigate(['/app']);
            }, 3 * 1000);
          },
          (resFail) => {
            this.toastr.error(
              'No se pudo actualizar la tarea, por favor intenta más tarde',
              '😡😡😡Error😡😡😡'
            );
          }
        );

        this.listObservables$ = [observer2$];
      } else {
        this.toastr.error('Faltan campos por llenar', 'Formulario incompleto');
      }
    } else {
      //TODO: Create
      if (this.loginForm.valid) {
        const body: People = {
          name: this.loginForm.getRawValue().name,
          lastname: this.loginForm.getRawValue().lastname,
          birth: this.loginForm.getRawValue().birth,
          message: this.loginForm.getRawValue().message,
        };
        const observer3$ = this.peopleSvc.createPeople(body).subscribe(
          (resOk) => {
            this.toastr.success('Se creo la tarea de manera correcta', 'Creación de Tarea 👏');
            setTimeout(() => {
              this.router.navigate(['/app']);
            }, 3 * 1000);
          },
          (resFail) => {
            this.toastr.error(
              'No se pudo crear la tarea, por favor intenta más tarde',
              '😡😡😡Error😡😡😡'
            );
          }
        );

        this.listObservables$ = [observer3$];
      } else {
        this.toastr.error('Faltan campos por llenar', 'Formulario incompleto');
      }
    }
  }
}
