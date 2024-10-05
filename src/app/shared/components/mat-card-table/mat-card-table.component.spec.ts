import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardTableComponent } from './mat-card-table.component';

describe('MatCardTableComponent', () => {
  let component: MatCardTableComponent;
  let fixture: ComponentFixture<MatCardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatCardTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatCardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
