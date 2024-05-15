import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarListService {
  constructor(private http: HttpClient) {}

  getCarsList(): Observable<Car[]> {
    return this.http.get<Car[]>('https://test.tspb.su/test-task/vehicles');
  }
}
