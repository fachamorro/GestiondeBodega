import { TestBed } from '@angular/core/testing';

import { ItemordenegresoService } from './itemordenegreso.service';

describe('ItemordenegresoService', () => {
  let service: ItemordenegresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemordenegresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
