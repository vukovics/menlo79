import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowService } from '../../services/show.service';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  filter,
  map,
} from 'rxjs';
import { apiResponse } from '../../interfaces/apiResponse.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('tvShowSearchInput', { static: true })
  tvShowSearchInput?: ElementRef;
  showsResponse: apiResponse[];
  isSearching?: boolean;

  constructor(private showService: ShowService) {
    this.isSearching = false;
    this.showsResponse = [];
  }

  ngOnInit(): void {
    fromEvent(this.tvShowSearchInput?.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          console.log(event.target.value);
          return event.target.value;
        }),
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.isSearching = true;
        console.log(text);
        this.showService.getTvShow(text).subscribe({
          next: (res: any) => {
            this.isSearching = false;
            this.showsResponse = res;
          },
          error: (err: any) => {
            this.isSearching = false;
            console.log('error', err);
          },
        });
      });
  }
}
