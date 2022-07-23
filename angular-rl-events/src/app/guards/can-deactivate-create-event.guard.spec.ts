import { TestBed } from '@angular/core/testing';

import { CanDeactivateCreateEventGuard } from './can-deactivate-create-event.guard';

describe('CanDeactivateCreateEventGuard', () => {
  let guard: CanDeactivateCreateEventGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateCreateEventGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
