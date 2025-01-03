import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatMedicalModalComponent } from './certificat-medical-modal.component';

describe('CertificatMedicalModalComponent', () => {
  let component: CertificatMedicalModalComponent;
  let fixture: ComponentFixture<CertificatMedicalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatMedicalModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatMedicalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
