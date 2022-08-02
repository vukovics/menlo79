import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { apiResponse } from '../../interfaces/apiResponse.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { ShowService } from '../../services/show.service';
import { of } from 'rxjs';

export class ShowServiceStub {
  constructor() {}

  getTvShow() {
    return of([]);
  }
  getTvShowDetails() {
    return of({});
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let showService: ShowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: ShowService, useValue: new ShowServiceStub() }],
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    showService = TestBed.inject(ShowService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 2 card components and counter should be 2', () => {
    component.showsResponse = [
      {
        score: 123123,
        show: {
          name: 'testShow',
          averageRuntime: 60,
        },
      },
      {
        score: 123233,
        show: {
          name: 'testShow2',
          averageRuntime: 63,
        },
      },
    ] as apiResponse[];

    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('card'));
    const counter = fixture.debugElement.query(By.css('h2'));

    expect(cards.length).toBe(2);
    expect(counter.nativeElement.textContent.trim()).toBe('Found: 2 hits');
  });

  it('should show Searching...', () => {
    component.isSearching = true;

    fixture.detectChanges();

    const counter = fixture.debugElement.query(By.css('h4'));

    expect(counter.nativeElement.textContent.trim()).toBe('Searching ...');
  });

  it('should not show card component', () => {
    component.showsResponse = [] as apiResponse[];

    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('card'));

    expect(cards.length).toBe(0);
  });

  it('should call service when something is typed in input', fakeAsync(() => {
    const showServiceSpy = spyOn(showService, 'getTvShow').and.callThrough();

    const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
    });

    const input = fixture.debugElement.query(By.css('input'));
    const inputElement = input.nativeElement;
    inputElement.value = 'abc';
    inputElement.dispatchEvent(event);

    tick(1000);

    fixture.detectChanges();

    expect(showServiceSpy).toHaveBeenCalledTimes(1);
    expect(component.isSearching).toBeFalse();
  }));
});
