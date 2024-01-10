import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionproduitComponent } from './gestionproduit.component';

describe('GestionproduitComponent', () => {
  let component: GestionproduitComponent;
  let fixture: ComponentFixture<GestionproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionproduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
