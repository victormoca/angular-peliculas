import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { Coordenada } from '../../funciones/Coordenada';


@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {
  private map!: L.Map;

  options = {
    center: {
      lng: -103.3496, // Default longitude for Guadalajara, Jalisco, Mexico
      lat: 20.6597  // Default latitude for Guadalajara, Jalisco, Mexico
    },
    zoom: 12
  };

  markerOptions = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    })
  };

  @Input()
  coordinates: Coordenada[] = [];

  @Output()
  coordinatesChange = new EventEmitter<Coordenada[]>();

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    if(this.coordinates && this.coordinates.length > 0) {
      this.options.center = {
        lng: this.coordinates[0].lng,
        lat: this.coordinates[0].lat
      };
    }
    this.map = L.map('map').setView([this.options.center.lat, this.options.center.lng], this.options.zoom);

    // Add TileLayer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);
    
    // Add initial marker if coordinates exist
    if(this.coordinates && this.coordinates.length > 0) {
      const coord = this.coordinates[0];
      L.marker([coord.lat, coord.lng], this.markerOptions).addTo(this.map);
    }
    
    // Connect click event to handleMapClick method
    this.map.on('click', (e: L.LeafletMouseEvent) => this.handleMapClick(e));
  }

  handleMapClick(event: L.LeafletMouseEvent): void {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    
    this.coordinates = [{ lat, lng }];
    
    // Limpiar marcadores anteriores
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    
    L.marker([lat, lng], this.markerOptions).addTo(this.map);
    this.coordinatesChange.emit(this.coordinates);
  }
}
