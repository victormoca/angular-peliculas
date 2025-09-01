import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEntidadComponent } from './editar-entidad.component';

describe('EditarEntidadComponent', () => {
  let component: EditarEntidadComponent;
  let fixture: ComponentFixture<EditarEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
