import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, catchError, throwError } from 'rxjs';
import { IShow } from '../interfaces/show.interface';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  constructor(private httpClient: HttpClient) {}

  getTvShow(term: string): Observable<IShow[] | []> {
    if (term === ' ') {
      return of([]);
    }
    return this.httpClient
      .get<IShow[]>('https://api.tvmaze.com/search/shows?q=' + term)
      .pipe(catchError((errorMsg) => throwError(() => new Error(errorMsg))));
  }

  getTvShowDetails(id: number): Observable<IShow> {
    return this.httpClient
      .get<IShow>('https://api.tvmaze.com/shows/' + id)
      .pipe(catchError((errorMsg) => throwError(() => new Error(errorMsg))));
  }
}
