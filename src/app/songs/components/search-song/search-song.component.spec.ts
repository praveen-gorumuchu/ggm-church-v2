import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSongComponent } from './search-song.component';

describe('SearchSongComponent', () => {
  let component: SearchSongComponent;
  let fixture: ComponentFixture<SearchSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
