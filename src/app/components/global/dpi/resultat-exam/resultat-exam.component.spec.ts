import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatExamComponent } from './resultat-exam.component';

describe('ResultatExamComponent', () => {
  let component: ResultatExamComponent;
  let fixture: ComponentFixture<ResultatExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
