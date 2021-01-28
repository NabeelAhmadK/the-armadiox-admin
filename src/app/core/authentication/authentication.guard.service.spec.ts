import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard.service';

describe('Authentication.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationGuard = TestBed.get(AuthenticationGuard);
    expect(service).toBeTruthy();
  });
});
