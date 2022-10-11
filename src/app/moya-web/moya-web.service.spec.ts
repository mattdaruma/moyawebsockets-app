import { TestBed } from '@angular/core/testing';

import { MoyaWebService } from './moya-web.service';

describe('MoyaWebService', () => {
  let service: MoyaWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoyaWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
