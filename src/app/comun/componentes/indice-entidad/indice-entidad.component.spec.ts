import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceEntidadComponent } from './indice-entidad.component';

describe('IndiceEntidadComponent', () => {
  let component: IndiceEntidadComponent;
  let fixture: ComponentFixture<IndiceEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndiceEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndiceEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
