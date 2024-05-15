import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Car } from './car';
import { CarListService } from './car-list.service';
import { EditCardComponent } from './edit-card/edit-card.component';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, EditCardComponent, MapComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'testProblem';
  private carsList$: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  carListObs$: Observable<Car[]> = this.carsList$.asObservable();
  sortOrder: string = '';
  editCardState: boolean = false;
  editedItem: Car | null = null;
  mapItem: Car | null = null;
  constructor(private carsList: CarListService) {}

  ngOnInit(): void {
    this.carsList
      .getCarsList()
      .pipe(
        tap((carList: Car[]) => {
          this.carsList$.next(carList);
        })
      )
      .subscribe();
    this.sortData('price-asc');
  }

  ngOnDestroy(): void {
    this.carsList$.complete();
  }

  editCard(id: number): void {
    this.editedItem =
      this.carsList$.getValue().find((value) => value.id === id) || null;
  }

  deleteCard(id: number): void {
    const cars = this.carsList$.getValue().filter((value) => value.id !== id);
    this.carsList$.next(cars);
  }

  closeEditCard(): void {
    this.editedItem = null;
  }

  sortData(sortOrder: string): void {
    const cars = this.carsList$.getValue();
    if (sortOrder === 'price-asc') {
      cars.sort((a, b) => a.price - b.price);
    }
    if (sortOrder === 'price-desc') {
      cars.sort((a, b) => b.price - a.price);
    }
    if (sortOrder === 'year-asc') {
      cars.sort((a, b) => a.year - b.year);
    }
    if (sortOrder === 'year-desc') {
      cars.sort((a, b) => b.year - a.year);
    }
    this.carsList$.next(cars);
  }

  addEditedItem(newData: Car): void {
    const updatedList = this.carsList$.getValue();
    const index = updatedList.findIndex((value) => value.id === newData.id);
    updatedList[index] = newData;
    this.carsList$.next(updatedList);
    this.editedItem = null;
  }

  showOnMap(id: number): void {
    this.mapItem =
      this.carsList$.getValue().find((value) => value.id === id) || null;
  }

  closeMapView() {
    this.mapItem = null;
  }
}
