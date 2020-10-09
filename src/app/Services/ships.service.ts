import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Ship } from '../Models/ship.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const url = 'https://swapi.dev/api/starships/';
    return this.http.get<any[]>(url);
  }
}
