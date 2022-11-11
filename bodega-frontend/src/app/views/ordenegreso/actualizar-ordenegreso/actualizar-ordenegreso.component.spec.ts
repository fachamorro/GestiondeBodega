import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarOrdenegresoComponent } from './actualizar-ordenegreso.component';

describe('ActualizarOrdenegresoComponent', () => {
  let component: ActualizarOrdenegresoComponent;
  let fixture: ComponentFixture<ActualizarOrdenegresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarOrdenegresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarOrdenegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
