import { TestBed } from '@angular/core/testing';

import { UidService } from './uid.service';

describe('UidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UidService = TestBed.get(UidService);
    expect(service).toBeTruthy();
  });
});
