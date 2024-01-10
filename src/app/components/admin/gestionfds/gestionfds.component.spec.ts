import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionfdsComponent } from './gestionfds.component';

describe('GestionfdsComponent', () => {
  let component: GestionfdsComponent;
  let fixture: ComponentFixture<GestionfdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionfdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionfdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
