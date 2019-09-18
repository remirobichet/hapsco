import { TestBed } from '@angular/core/testing';

import { HapscoService } from './hapsco.service';

describe('HapscoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HapscoService = TestBed.get(HapscoService);
    expect(service).toBeTruthy();
  });
});
