import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GenerosService } from './generos.service';

describe('GenerosService', () => {
  let service: GenerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GenerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
