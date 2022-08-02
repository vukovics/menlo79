import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { IShow } from '../../interfaces/show.interface';
import { ShowService } from '../../services/show.service';
import { ShowServiceStub } from '../home/home.component.spec';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let showService: ShowService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: ShowService, useValue: new ShowServiceStub() }],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    showService = TestBed.inject(ShowService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the getTvShowDetails onInit', () => {
    const showServiceSpy = spyOn(
      showService,
      'getTvShowDetails'
    ).and.callThrough();
    component.ngOnInit();
    expect(showServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should show tvShow details', () => {
    component.showDetails$ = of({
      name: 'Rambo IV',
      type: 'Action',
      language: 'en',
      premiered: '1997',
    }) as Observable<IShow>;

    fixture.detectChanges();
    const details = fixture.debugElement.queryAll(By.css('span'));

    component.showDetails$?.subscribe((value) => {
      expect(details[0].nativeElement.textContent.trim()).toBe(value.name);
      expect(details[1].nativeElement.textContent.trim()).toBe(value.type);
      expect(details[2].nativeElement.textContent.trim()).toBe(value.language);
      expect(details[3].nativeElement.textContent.trim()).toBe(value.premiered);
    });
  });
});
