import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeocoderService {
  constructor(private http: HttpClient) {}

  findCoordinateByAddress(
    address: string
  ): Observable<{ lat: string; lon: string }> {
    return this.http
      .get<{ lat: string; lon: string }[]>(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            format: 'json',
            addressdetails: 1,
            q: address,
            limit: 1,
          },
        }
      )
      .pipe(
        map((res) => {
          if (res.length === 0) {
            return { lat: '0', lon: '0' };
          }
          return res[0];
        })
      );
  }
}
