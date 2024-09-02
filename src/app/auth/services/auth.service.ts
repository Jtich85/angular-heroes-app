import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;  //opcional

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string ): Observable<User> {

    // http.post('login',{ email, password });

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'sakfsadkja.sadasd.asdasd') )  //user.id.toString()
      );
  }

  checkAuthentification(): Observable<boolean>  {

    if( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ), // user={name:'Fernando'}, !user = false (que no esta vacio), !!user=true
        catchError( err => of(false) )
      )
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
