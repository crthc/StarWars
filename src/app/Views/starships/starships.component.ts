import { Component, OnInit } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, map, share, startWith, switchMap } from 'rxjs/operators';

import { LoadShip } from '../../Models/loadShip.interface';
import { Ship, ShipsService } from '../../Services/ships.service';

import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
})
export class StarshipsComponent implements OnInit {
  public totalShips: number = 1;
  public ships: Ship[] = [];
  public page: number = 1;
  public visuals: any[] = [];
  private url: any[] = [];

  constructor(
    private shipService: ShipsService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadShips();
    this.loadImg();
  }

  loadShips() {
    this.shipService.loadShips(this.page).subscribe(({ count, results }) => {
      this.totalShips = count;
      this.ships = results;
    });
  }

  loadImg() {
    this.shipService.loadShips(1).subscribe((resp) => {
      this.url.push(resp.results);

      for (let ship of this.ships) {
        this.visuals.push(
          'https://starwars-visualguide.com/assets/img/starships/' +
            ship.url.replace(/\D/g, '') +
            '.jpg'
        );
      }
    });
    console.log(this.visuals);
  }

  onPageChanged(value: number) {
    this.page += value;

    if (this.page < 1) {
      this.page = 1;
    } else if (this.page > 4) {
      this.page -= value;
    }

    this.loadShips();

    const loadVisuals = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve((this.visuals = []));
      }, 10);
    });
    loadVisuals.then((imagenes) => this.loadImg());
  }

  out() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
