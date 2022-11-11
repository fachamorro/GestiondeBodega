import { TestBed } from '@angular/core/testing';

import { ItemordencompraService } from './itemordencompra.service';

describe('ItemordencompraService', () => {
  let service: ItemordencompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemordencompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
