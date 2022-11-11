import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLoteproductoComponent } from './detalle-loteproducto.component';

describe('DetalleLoteproductoComponent', () => {
  let component: DetalleLoteproductoComponent;
  let fixture: ComponentFixture<DetalleLoteproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleLoteproductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleLoteproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
