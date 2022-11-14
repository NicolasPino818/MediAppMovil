import { TestBed } from '@angular/core/testing';

import { ScannerAccessGuard } from './scanner-access.guard';

describe('ScannerAccessGuard', () => {
  let guard: ScannerAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ScannerAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
