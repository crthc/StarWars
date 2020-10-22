import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoadShip } from '../Models/loadShip.interface';

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
  img: string = `https://starwars-visualguide.com/assets/img/starships/`;
}

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  private ship: Ship[];

  baseUrl = 'https://swapi.dev/api/starships/';
  imgUrl = 'https://starwars-visualguide.com/assets/img/starships/';

  constructor(private http: HttpClient) {}

  loadShips(page: number = 1) {
    const url = `${this.baseUrl}?page=${page}`;
    return this.http.get<LoadShip>(url);
  }

  loadImg(page: number = 5) {
    const url = `${this.imgUrl}${page}.jpg`;
    return this.http.get<LoadShip>(url);
  }
}
