import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWorkflowComponent } from './approve-workflow.component';

describe('ApproveWorkflowComponent', () => {
  let component: ApproveWorkflowComponent;
  let fixture: ComponentFixture<ApproveWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveWorkflowComponent]
    });
    fixture = TestBed.createComponent(ApproveWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
