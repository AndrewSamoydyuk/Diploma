import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { Device } from '../models/device.model';

@Injectable()
export class DevicesService extends BaseService {

  baseUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  getDevices(): Observable<Device> {
    const user =  JSON.parse(localStorage.getItem('user'));
    let authToken = '';
    if (user) {
      authToken = user.auth_token;
    }
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      })
    };

    return this.http.get(this.baseUrl + 'api/SampleData/WeatherForecasts', headers)
    .pipe(
      map(res => console.log(res)),
      catchError(this.handleError)
    );
  }
}
