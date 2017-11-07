import { TestBed, inject } from '@angular/core/testing';

import { VideoSearchService } from './video-search.service';

describe('VideoSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoSearchService]
    });
  });

  it('should be created', inject([VideoSearchService], (service: VideoSearchService) => {
    expect(service).toBeTruthy();
  }));
});
