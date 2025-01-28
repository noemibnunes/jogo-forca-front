import { TestBed } from '@angular/core/testing';

import { JogoDaForcaService } from './jogo-da-forca.service';

describe('JogoDaForcaService', () => {
  let service: JogoDaForcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JogoDaForcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
