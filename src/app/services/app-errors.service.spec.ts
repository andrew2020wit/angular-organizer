import { TestBed } from '@angular/core/testing';

import { AppErrorsService } from './app-errors.service';

describe('AppErrorsService', () => {
  let service: AppErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
