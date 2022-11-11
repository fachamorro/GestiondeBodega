import { TestBed } from '@angular/core/testing';

import { LoteproductoService } from './loteproducto.service';

describe('LoteproductoService', () => {
  let service: LoteproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoteproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
