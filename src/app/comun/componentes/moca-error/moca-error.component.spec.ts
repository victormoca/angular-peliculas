import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MocaErrorComponent } from './moca-error.component';

describe('MocaErrorComponent', () => {
  let component: MocaErrorComponent;
  let fixture: ComponentFixture<MocaErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MocaErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MocaErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
