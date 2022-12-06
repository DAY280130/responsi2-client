import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseApiUrl: string = 'http://localhost:8000/api';

  constructor() {}

  doGet(endpoint: string, parameter: string | null): Observable<any> {
    return from(
      Http.request({
        method: 'GET',
        url: `${this.baseApiUrl}/${endpoint}${
          parameter ? `/${parameter}` : ''
        }`,
      })
    );
  }

  doPost(endpoint: string, data: Object | null): Observable<any> {
    return from(
      Http.request({
        method: 'POST',
        url: `${this.baseApiUrl}/${endpoint}`,
        headers: { 'Content-Type': 'application/json' },
        data: data ? data : {},
      })
    );
  }

  doPut(endpoint: string, data: Object | null): Observable<any> {
    return from(
      Http.request({
        method: 'PUT',
        url: `${this.baseApiUrl}/${endpoint}`,
        headers: { 'Content-Type': 'application/json' },
        data: data ? data : {},
      })
    );
  }

  doDelete(endpoint: string, data: Object | null): Observable<any> {
    return from(
      Http.request({
        method: 'DELETE',
        url: `${this.baseApiUrl}/${endpoint}`,
        headers: { 'Content-Type': 'application/json' },
        data: data ? data : {},
      })
    );
  }
}
