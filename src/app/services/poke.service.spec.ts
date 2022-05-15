import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { PokeService } from './poke.service';
import { pokeListMock } from '../__mocks__/pokeList.mock';

describe('PokeService', () => {
  let service: PokeService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeService],
    });
    httpClient = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokeService);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia hacer una peticion http', (done: DoneFn) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=8';

    service.getList().subscribe(() => {
      done();
    });

    const req: TestRequest = httpClient.expectOne(url);

    expect(req.request.url).toEqual(service.url);
    expect(req.request.urlWithParams).toEqual(url);
    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('Debería retornar la lista de pokemones', (done: DoneFn) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=8';

    service.getList().subscribe((res) => {
      expect(res).toEqual(pokeListMock);
      expect(res.results.length).toBe(8);

      done();
    });

    httpClient.expectOne(url).flush(pokeListMock);
  });
});
