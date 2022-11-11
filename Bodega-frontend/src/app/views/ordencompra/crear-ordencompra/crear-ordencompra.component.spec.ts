import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOrdencompraComponent } from './crear-ordencompra.component';

describe('CrearOrdencompraComponent', () => {
  let component: CrearOrdencompraComponent;
  let fixture: ComponentFixture<CrearOrdencompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearOrdencompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearOrdencompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
