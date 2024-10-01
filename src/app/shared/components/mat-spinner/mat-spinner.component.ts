import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mat-spinner',
  templateUrl: './mat-spinner.component.html',
  styleUrls: ['./mat-spinner.component.scss']
})
export class MatSpinnerComponent implements OnInit {
  @Input() value: number = 100;
  @Input() diameter: number = 50;
  @Input() mode: ProgressSpinnerMode = "indeterminate";
  @Input() strokeWidth: number = 5;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";
  @Input() panelClass: string = '';
  @Input() customClass: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
