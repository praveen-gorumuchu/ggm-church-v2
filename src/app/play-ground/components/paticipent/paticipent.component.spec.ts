import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaticipentComponent } from './paticipent.component';

describe('PaticipentComponent', () => {
  let component: PaticipentComponent;
  let fixture: ComponentFixture<PaticipentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaticipentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaticipentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
