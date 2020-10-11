import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from '../../Models/paginationPage';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() page: Page<any>;
  @Output() pageChange = new EventEmitter<string>();
}
