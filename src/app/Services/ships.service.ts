import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Page, queryPaginated } from '../Models/paginationPage';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class Ship {
  id: number;
  mglt: string;
  cargo_capacity: number;
  consumables: string;
  cost_in_credits: number;
  created: string;
  crew: number;
  edited: string;
  hyperdrive_rating: number;
  length: number;
  manufacturer: string;
  max_atmosphering_speed: number;
  model: string;
  name: string;
  passengers: number;
  films: [];
  pilots: [];
  starship_class: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  private ship: Ship[];

  baseUrl = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) {}

  list(urlOrFilter?: string | object): Observable<Page<Ship>> {
    return queryPaginated<Ship>(this.http, this.baseUrl, urlOrFilter);
  }
}
