import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SwapiService } from './services/swapi.service';
import { HttpModule } from '@nestjs/axios';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Movie])
  ],
  controllers: [MoviesController],
  providers: [MoviesService, SwapiService],
})
export class MoviesModule {}
