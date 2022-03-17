import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitMsgComponent } from './submit-msg.component';

describe('SubmitMsgComponent', () => {
  let component: SubmitMsgComponent;
  let fixture: ComponentFixture<SubmitMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
