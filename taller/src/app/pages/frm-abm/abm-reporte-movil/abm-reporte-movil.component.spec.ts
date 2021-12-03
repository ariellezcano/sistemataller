import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmReporteMovilComponent } from './abm-reporte-movil.component';

describe('AbmReporteMovilComponent', () => {
  let component: AbmReporteMovilComponent;
  let fixture: ComponentFixture<AbmReporteMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmReporteMovilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmReporteMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
