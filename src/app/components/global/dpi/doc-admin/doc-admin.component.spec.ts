import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAdminComponent } from './doc-admin.component';

describe('DocAdminComponent', () => {
  let component: DocAdminComponent;
  let fixture: ComponentFixture<DocAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
