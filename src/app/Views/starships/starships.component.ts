import { Component, OnInit } from '@angular/core';
import { ShipsService } from '../../Services/ships.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css'],
})
export class StarshipsComponent implements OnInit {
  loading = false;
  data: Array<any>;
  totalRecords: String;
  page: Number = 1;

  constructor(private ships: ShipsService) {
    this.data = new Array<any>();
  }

  getShips() {
    this.ships.getData().subscribe((data) => {
      console.log(data);
      this.data = data.results;
      this.totalRecords = data.results.length;
    });
  }

  ngOnInit(): void {
    this.ships.getData().subscribe((data) => {
      console.log(data);
      this.loading = true;
      this.data = data.results;
      this.totalRecords = data.results.length;
    });
  }
}
