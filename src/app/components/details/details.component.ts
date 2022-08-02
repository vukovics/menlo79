import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IShow } from '../../interfaces/show.interface';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  showDetails$?: Observable<IShow>;
  constructor(
    private route: ActivatedRoute,
    private showService: ShowService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.showDetails$ = this.showService.getTvShowDetails(params['id']);
    });
  }
}
