import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "./map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @Input() address: string;

  map: L.Map;
  coordinates : string;

  constructor(private mapService: MapService) {}

  private initMap(): void {
    this.search(this.address);
    this.map = L.map('map', {
      center: [0,0],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    

    tiles.addTo(this.map);
  }

  search(address : string): void {
    this.mapService.search(address).subscribe({
      next: (result) => {
        console.log(result);
        this.map.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            this.map.removeLayer(layer);
          }
        });
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup(address)
          .openPopup();
        this.coordinates = result[0].lat + " " + result[0].lon
        this.map.setView([result[0].lat, result[0].lon], 13);
        },
      error: () => {},
    });
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
    this.search(this.address);
  }
}
