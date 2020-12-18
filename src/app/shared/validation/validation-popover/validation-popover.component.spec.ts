import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationPopoverComponent } from './validation-popover.component';

describe('ValidationPopoverComponent', () => {
  let component: ValidationPopoverComponent;
  let fixture: ComponentFixture<ValidationPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
