import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterFillComponent } from './letter-fill.component';

describe('LetterFillComponent', () => {
  let component: LetterFillComponent;
  let fixture: ComponentFixture<LetterFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LetterFillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
