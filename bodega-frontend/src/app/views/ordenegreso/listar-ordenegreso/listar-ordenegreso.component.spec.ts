import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOrdenegresoComponent } from './listar-ordenegreso.component';

describe('ListarOrdenegresoComponent', () => {
  let component: ListarOrdenegresoComponent;
  let fixture: ComponentFixture<ListarOrdenegresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarOrdenegresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarOrdenegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
