import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { People } from '@modules/home/models/people';
import { PeopleService } from '@modules/home/service/people.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  todoForm = this.fb.nonNullable.group({
    message: [
      '',
      [Validators.required, Validators.maxLength(200), Validators.minLength(5)],
    ],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    birth: ['', [Validators.required]],
  });

  id!: string | null;

  option = {
    title: 'Formulario de Crear',
    button: 'Crear',
    classBtn: 'primary',
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
        classBtn: 'accent',
      };
      const observer1$ = this.peopleSvc
        .getOnePeople(this.id)
        .subscribe((resOk) => {
          this.todoForm.patchValue({
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
      if (this.todoForm.valid) {
        const body: People = {
          name: this.todoForm.getRawValue().name,
          lastname: this.todoForm.getRawValue().lastname,
          birth: this.todoForm.getRawValue().birth,
          message: this.todoForm.getRawValue().message,
        };
        const observer2$ = this.peopleSvc.updatePeople(this.id, body).subscribe(
          (resOk) => {
            this.toastr.success(
              'Se actualizo la tarea de manera satisfatoria',
              'Actualización de Tarea👏'
            );
            setTimeout(() => {
              this.router.navigate(['/app']);
            }, 2 * 1000);
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
      if (this.todoForm.valid) {
        const body: People = {
          name: this.todoForm.getRawValue().name,
          lastname: this.todoForm.getRawValue().lastname,
          birth: this.todoForm.getRawValue().birth,
          message: this.todoForm.getRawValue().message,
        };
        const observer3$ = this.peopleSvc.createPeople(body).subscribe(
          (resOk) => {
            this.toastr.success('Se creo la tarea de manera correcta', 'Creación de Tarea 👏');
            setTimeout(() => {
              this.router.navigate(['/app']);
            }, 2 * 1000);
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
