import { Component, Input } from '@angular/core';
import { DataTableButtons, TableHeaders } from '../../models/new/table-headers.model copy';

@Component({
  selector: 'app-mat-card-table',
  templateUrl: './mat-card-table.component.html',
  styleUrl: './mat-card-table.component.scss'
})
export class MatCardTableComponent {
  @Input() headers: TableHeaders[] = [];
  @Input() buttons: DataTableButtons[] = [];
  @Input() dataSource: any[] = [];

}
