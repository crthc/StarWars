import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ship, ShipsService } from '../../Services/ships.service';

@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.scss'],
})
export class ShipDetailComponent implements OnInit {
  ngOnInit(): void {}
}
