import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { People } from '../models/people';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private readonly API = environment.api;
  constructor(private readonly http: HttpClient) {}

  createPeople(people: People): Observable<People> {
    const body = {
      name: people.name,
      lastname: people.lastname,
      birth: people.birth,
      message: people.message,
    };
    return this.http.post<People>(this.API + '/people', body);
  }

  updatePeople(id: string, people: People): Observable<People> {
    const body = {
      name: people.name,
      lastname: people.lastname,
      birth: people.birth,
      message: people.message,
    };
    return this.http.put<People>(this.API + '/people/' + id, body);
  }

  getAllPeople(): Observable<People[]> {
    return this.http.get<People[]>(this.API + '/people');
  }

  deletePeople(id: string | undefined): Observable<People> {
    return this.http.delete<People>(this.API + '/people/' + id);
  }

  getOnePeople(id: string | undefined): Observable<People> {
    return this.http.get<People>(this.API + '/people/' + id);
  }
}
