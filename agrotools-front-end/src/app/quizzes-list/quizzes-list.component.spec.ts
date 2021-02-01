import { ComponentFixture, TestBed } from '@angular/core/testing';

import { quizzesListComponent } from './quizzes-list.component';

describe('quizzesListComponent', () => {
  let component: quizzesListComponent;
  let fixture: ComponentFixture<quizzesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ quizzesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(quizzesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
