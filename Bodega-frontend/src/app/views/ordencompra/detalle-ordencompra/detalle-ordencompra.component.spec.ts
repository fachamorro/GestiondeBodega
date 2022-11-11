import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrdencompraComponent } from './detalle-ordencompra.component';

describe('DetalleOrdencompraComponent', () => {
  let component: DetalleOrdencompraComponent;
  let fixture: ComponentFixture<DetalleOrdencompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleOrdencompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleOrdencompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
