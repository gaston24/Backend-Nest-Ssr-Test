import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { SwapiService } from './services/swapi.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        { provide: SwapiService, useValue: {} },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
