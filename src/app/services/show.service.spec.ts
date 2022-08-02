import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IShow } from '../interfaces/show.interface';
import { ShowService } from './show.service';

describe('ShowService', () => {
  let httpMock: HttpTestingController;
  let service: ShowService;
  let fakeShows = [
    {
      name: 'Fake Show 1',
      language: 'en',
    },
    {
      name: 'Fake Show 2',
      language: 'es',
    },
  ] as Partial<IShow[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShowService],
    });
    service = TestBed.inject(ShowService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should call get request on getTvShow', () => {
    service.getTvShow('test').subscribe();
    const req = httpMock.expectOne(
      'https://api.tvmaze.com/search/shows?q=test'
    );
    expect(req.request.method).toEqual('GET');
    req.flush([false, true, false]);
    httpMock.verify();
  });

  it('should return empty array on getTvShow', () => {
    let shows: IShow[] = [];

    service.getTvShow('').subscribe((t) => {
      shows = t;
    });

    expect(shows.length).toEqual(0);
  });

  it('should call get request on getTvShowDetails', () => {
    service.getTvShowDetails(3).subscribe();
    const req = httpMock.expectOne('https://api.tvmaze.com/shows/3');
    expect(req.request.method).toEqual('GET');
    req.flush([false, true, false]);
    httpMock.verify();
  });
});
