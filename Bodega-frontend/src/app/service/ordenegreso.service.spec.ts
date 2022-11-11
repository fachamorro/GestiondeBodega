import { TestBed } from '@angular/core/testing';

import { OrdenegresoService } from './ordenegreso.service';

describe('OrdenegresoService', () => {
  let service: OrdenegresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenegresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
