import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerResumeComponent } from './answer-resume.component';

describe('AnswerResumeComponent', () => {
  let component: AnswerResumeComponent;
  let fixture: ComponentFixture<AnswerResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
