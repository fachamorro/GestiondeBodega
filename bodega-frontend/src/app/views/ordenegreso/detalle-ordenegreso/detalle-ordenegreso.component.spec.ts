import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrdenegresoComponent } from './detalle-ordenegreso.component';

describe('DetalleOrdenegresoComponent', () => {
  let component: DetalleOrdenegresoComponent;
  let fixture: ComponentFixture<DetalleOrdenegresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleOrdenegresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleOrdenegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
