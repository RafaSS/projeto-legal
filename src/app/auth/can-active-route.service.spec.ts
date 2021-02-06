import { TestBed } from '@angular/core/testing';

import { CanActiveRouteService } from './can-active-route.service';

describe('CanActiveRouteService', () => {
  let service: CanActiveRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActiveRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
