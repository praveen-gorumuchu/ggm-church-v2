import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInteractionComponent } from './player-interaction.component';

describe('PlayerInteractionComponent', () => {
  let component: PlayerInteractionComponent;
  let fixture: ComponentFixture<PlayerInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerInteractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
