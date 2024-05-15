import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM, Vector } from 'ol/source';
import { Vector as LayerVector } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Car } from '../car';

@Component({
  selector: 'card-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @Input() coordinate!: Car;
  @ViewChild('map') mapElement!: ElementRef;
  @Output() closeMapView = new EventEmitter<void>();

  closeMap() {
    this.closeMapView.emit();
  }
  map!: Map;
  ngAfterViewInit(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: this.mapElement.nativeElement,
      view: new View({
        center: fromLonLat([
          this.coordinate.longitude,
          this.coordinate.latitude,
        ]),
        zoom: 16,
        maxZoom: 18,
      }),
    });
    const markers = new LayerVector({
      source: new Vector(),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          scale: [0.08, 0.08],
          src: '/assets/marker.webp',
        }),
      }),
    });
    this.map.addLayer(markers);

    const marker = new Feature(
      new Point(
        fromLonLat([this.coordinate.longitude, this.coordinate.latitude])
      )
    );
    markers.getSource()?.addFeature(marker);
  }
}
