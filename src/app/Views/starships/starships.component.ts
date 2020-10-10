import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, map, share, startWith, switchMap } from 'rxjs/operators';

import { Page } from '../../Models/paginationPage';

import { Ship, ShipsService } from '../../Services/ships.service';

import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css'],
})
export class StarshipsComponent {
  filterForm: FormGroup;
  page: Observable<Page<Ship>>;
  pageUrl = new Subject<string>();
  totalRecords: String;

  constructor(
    private shipService: ShipsService,
    public auth: AuthService,
    private router: Router
  ) {
    this.filterForm = new FormGroup({
      search: new FormControl(),
    });

    const filterValue = this.filterForm.valueChanges.pipe(
      debounceTime(200),
      startWith(this.filterForm.value)
    );
    this.page = merge(filterValue, this.pageUrl).pipe(
      switchMap((urlOrFilter) => this.shipService.list(urlOrFilter)),
      share()
    );
  }

  onPageChanged(url: string) {
    this.pageUrl.next(url);
  }

  out() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
