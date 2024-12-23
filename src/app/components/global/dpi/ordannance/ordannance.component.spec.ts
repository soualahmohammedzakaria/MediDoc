import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdannanceComponent } from './ordannance.component';

describe('OrdannanceComponent', () => {
  let component: OrdannanceComponent;
  let fixture: ComponentFixture<OrdannanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdannanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdannanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
