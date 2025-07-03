import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosPeliculasComponent } from './filtros-peliculas.component';

describe('FiltrosPeliculasComponent', () => {
  let component: FiltrosPeliculasComponent;
  let fixture: ComponentFixture<FiltrosPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosPeliculasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
