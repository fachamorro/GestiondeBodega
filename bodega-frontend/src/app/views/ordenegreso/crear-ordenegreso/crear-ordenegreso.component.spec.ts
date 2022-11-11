import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOrdenegresoComponent } from './crear-ordenegreso.component';

describe('CrearOrdenegresoComponent', () => {
  let component: CrearOrdenegresoComponent;
  let fixture: ComponentFixture<CrearOrdenegresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearOrdenegresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearOrdenegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
