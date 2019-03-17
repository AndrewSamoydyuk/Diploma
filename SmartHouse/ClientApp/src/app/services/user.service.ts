import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegistration } from '../models/user.registration.interface';
import { BaseService } from './base.service';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class UserService extends BaseService {

  baseUrl = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super();
    this.loggedIn = !!localStorage.getItem('user');
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = baseUrl;
  }

  register(email: string, password: string, firstName: string, lastName: string,location: string): Observable<UserRegistration> {
    const body = JSON.stringify({ email, password, firstName, lastName, location });
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl + 'api/accounts', body, headers)
      .pipe(
        map(res => true),
        catchError(this.handleError)
      );
  }

  login(userName, password) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post(this.baseUrl + 'api/auth/login', JSON.stringify({ userName, password }), headers)
      .pipe(
        map(res => {
          localStorage.setItem('user', JSON.stringify(res));
          this.loggedIn = true;
          this._authNavStatusSource.next(true);
          return true;
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

