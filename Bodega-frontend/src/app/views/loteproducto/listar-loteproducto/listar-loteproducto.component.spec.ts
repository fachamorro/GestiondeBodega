import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLoteproductoComponent } from './listar-loteproducto.component';

describe('ListarLoteproductoComponent', () => {
  let component: ListarLoteproductoComponent;
  let fixture: ComponentFixture<ListarLoteproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLoteproductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarLoteproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
