import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarOrdencompraComponent } from './actualizar-ordencompra.component';

describe('ActualizarOrdencompraComponent', () => {
  let component: ActualizarOrdencompraComponent;
  let fixture: ComponentFixture<ActualizarOrdencompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarOrdencompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarOrdencompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
