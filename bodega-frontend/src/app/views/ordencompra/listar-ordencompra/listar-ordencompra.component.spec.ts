import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOrdencompraComponent } from './listar-ordencompra.component';

describe('ListarOrdencompraComponent', () => {
  let component: ListarOrdencompraComponent;
  let fixture: ComponentFixture<ListarOrdencompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarOrdencompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarOrdencompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
