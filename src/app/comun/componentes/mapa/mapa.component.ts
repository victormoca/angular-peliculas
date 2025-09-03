import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Coordenada } from '../../funciones/Coordenada';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  template: `<div #mapEl class="mapa"></div>`,
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit, OnChanges {
  @ViewChild('mapEl', { static: true }) mapEl!: ElementRef<HTMLDivElement>;

  @Input() coordinates: Coordenada[] = [];
  @Output() coordinatesChange = new EventEmitter<Coordenada[]>();
  @Input() soloLectura? = false;

  private map!: L.Map;
  private markers = L.layerGroup();

  // Configura los íconos por defecto (una sola vez)
  private static initIcons = (() => {
    // @ts-ignore
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl:       'assets/leaflet/marker-icon.png',
      shadowUrl:     'assets/leaflet/marker-shadow.png'
    });

    return true;
  })();

  ngAfterViewInit(): void {
    const center = this.coordinates?.[0] ?? { lat: 20.6597, lng: -103.3496 }; // GDL
    this.map = L.map(this.mapEl.nativeElement).setView([center.lat, center.lng], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 50,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markers.addTo(this.map);

    // Pintar según modo
    if (this.coordinates?.length) {
      if (this.soloLectura) {
        this.setMarkers(this.coordinates);
        this.tryFitBounds();
      } else {
        this.setSingleMarker(this.coordinates[0]);
      }
    }

    // Click: en soloLectura no hace nada; en edición deja un único marker y emite
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.soloLectura) return;

      const c = { lat: e.latlng.lat, lng: e.latlng.lng, texto: '' };
      this.setSingleMarker(c);
      this.coordinates = [c];
      this.coordinatesChange.emit(this.coordinates);
    });

    // Corregir tamaño tras render
    setTimeout(() => this.map.invalidateSize(), 0);
    window.addEventListener('resize', () => this.map.invalidateSize());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;

    if (changes['coordinates']) {
      if (this.coordinates?.length) {
        if (this.soloLectura) {
          this.setMarkers(this.coordinates);
          this.tryFitBounds();
        } else {
          this.setSingleMarker(this.coordinates[0]);
          this.map.setView([this.coordinates[0].lat, this.coordinates[0].lng], this.map.getZoom() || 12);
        }
      } else {
        // Sin coords: limpia marcadores
        this.markers.clearLayers();
      }
    }

    if (changes['soloLectura'] && this.coordinates?.length) {
      // Si cambia el modo, repintamos acorde
      if (this.soloLectura) {
        this.setMarkers(this.coordinates);
        this.tryFitBounds();
      } else {
        this.setSingleMarker(this.coordinates[0]);
      }
    }
  }

  private setSingleMarker(c: Coordenada) {
    this.markers.clearLayers();
    L.marker([c.lat, c.lng]).addTo(this.markers);
  }

 private setMarkers(coords: Coordenada[]) {
    this.markers.clearLayers();
    coords.forEach(c => {
      const marker = L.marker([c.lat, c.lng]);
      if (this.soloLectura && c.texto) {
        marker.bindPopup(c.texto, {autoClose: false, autoPan: false});
      }
      marker.addTo(this.markers);
    });
  }

  private tryFitBounds() {
    // Ajusta vista si hay varios marcadores (en soloLectura)
    const layers = (this.markers as any)?._layers as Record<string, L.Layer> | undefined;
    if (!layers) return;
    const latlngs: L.LatLngExpression[] = [];
    Object.values(layers).forEach(l => {
      if ((l as any).getLatLng) {
        latlngs.push((l as any).getLatLng());
      }
    });
    if (latlngs.length > 1) {
      this.map.fitBounds(L.latLngBounds(latlngs), { padding: [20, 20] });
    } else if (latlngs.length === 1) {
      this.map.setView(latlngs[0] as L.LatLngExpression, this.map.getZoom() || 12);
    }
  }
}
