import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, Marker, icon } from 'leaflet';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  map: Map;
  mapOptions: MapOptions;

  constructor() {}

  ngOnInit() {
    this.initializeMapOptions();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(41.39346695448821, 2.1632364392280583),
      zoom: 15,
      layers: [
        tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 18,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        ),
      ],
    };
  }

  private addSampleMarker() {
    const marker = new Marker([41.395632, 2.161381]).setIcon(
      icon({
        iconSize: [36, 40],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
      })
    );
    marker
      .addTo(this.map)
      .bindPopup(
        '<b>Massimo Dutti Store</b><br>Paseo de Gracia, 96, 08008 Barcelona'
      );
  }
}
