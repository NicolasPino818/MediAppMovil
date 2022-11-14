import { TestBed } from '@angular/core/testing';

import { EmbajadorAccessGuard } from './embajador-access.guard';

describe('EmbajadorAccessGuard', () => {
  let guard: EmbajadorAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmbajadorAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
