import { Component, Input } from '@angular/core';
import { apiResponse } from '../../../interfaces/apiResponse.interface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() singleShow?: apiResponse;
}
