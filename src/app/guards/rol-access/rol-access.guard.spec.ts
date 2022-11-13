import { TestBed } from '@angular/core/testing';

import { RolAccessGuard } from './rol-access.guard';

describe('RolAccessGuard', () => {
  let guard: RolAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
