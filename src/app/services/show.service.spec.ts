import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { ShowService } from './show.service';

describe('ShowService', () => {
  let httpMock: HttpTestingController;
  let service: ShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ShowService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get request on getTvShow', fakeAsync(() => {
    service.getTvShow('test').subscribe(() => {});
    const req = httpMock.expectOne(
      'https://api.tvmaze.com/search/shows?q=test'
    );
    expect(req.request.method).toEqual('GET');
    req.flush([false, true, false]);
    httpMock.verify();
  }));

  it('should call get request on getTvShowDetails', () => {
    service.getTvShowDetails(3).subscribe(() => {});
    const req = httpMock.expectOne('https://api.tvmaze.com/shows/3');
    expect(req.request.method).toEqual('GET');
    req.flush([false, true, false]);
    httpMock.verify();
  });
});
