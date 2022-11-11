import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTipoproductoComponent } from './actualizar-tipoproducto.component';

describe('ActualizarTipoproductoComponent', () => {
  let component: ActualizarTipoproductoComponent;
  let fixture: ComponentFixture<ActualizarTipoproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarTipoproductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarTipoproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
