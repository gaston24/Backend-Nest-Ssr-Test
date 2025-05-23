import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { CreateFilmDto } from '../dto/create-film.dto';
import { UpdateFilmDto } from '../dto/update-film.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SwapiService {
  private readonly baseUrl = 'https://swapi.tech/api';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getFilms() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/films/`),
    );
    return response.data;
  }

  async getFilmById(id: string) {
    try {
      const movie = await this.movieRepository.findOne({ where: { swapiId: id } });
      if (movie) {
        return movie;
      }

      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/films/${id}/`),
      );
      return response.data;
    } catch (error) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
  }

  async createFilm(createFilmDto: CreateFilmDto) {
    const existingMovie = await this.movieRepository.findOne({
      where: { swapiId: createFilmDto.swapiId },
    });

    if (existingMovie) {
      return { message: 'Film already exists in database' };
    }

    const movie = this.movieRepository.create({
      ...createFilmDto,
      swapiId: createFilmDto.swapiId,
    });

    movie.characters = createFilmDto.characters || [];
    movie.planets = createFilmDto.planets || [];
    movie.starships = createFilmDto.starships || [];
    movie.vehicles = createFilmDto.vehicles || [];
    movie.species = createFilmDto.species || [];

    const savedMovie = await this.movieRepository.save(movie);
    console.log('Film created in database:', savedMovie);
    return savedMovie;
  }

  async updateFilm(id: string, updateFilmDto: UpdateFilmDto) {

    const movie = await this.movieRepository.findOne({ where: { swapiId: id } });
    if (!movie) {
      throw new NotFoundException(`Film with ID ${id} not found in database`);
    }


    Object.assign(movie, updateFilmDto);

    if (updateFilmDto.characters) movie.characters = updateFilmDto.characters;
    if (updateFilmDto.planets) movie.planets = updateFilmDto.planets;
    if (updateFilmDto.starships) movie.starships = updateFilmDto.starships;
    if (updateFilmDto.vehicles) movie.vehicles = updateFilmDto.vehicles;
    if (updateFilmDto.species) movie.species = updateFilmDto.species;

    const updatedMovie = await this.movieRepository.save(movie);
    console.log('Film updated in database:', updatedMovie);
    return updatedMovie;
  }

  async deleteFilm(id: string) {
    const movie = await this.movieRepository.findOne({ where: { swapiId: id } });
    if (!movie) {
      throw new NotFoundException(`Film with ID ${id} not found in database`);
    }

    await this.movieRepository.remove(movie);
    console.log('Film deleted from database:', movie);
    return { message: 'Film deleted successfully', deletedFilm: movie };
  }

  async syncFilms() {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/films/`),
    );
    console.log('SWAPI response:', response.data);

    if (!response.data || !response.data.result) {
      throw new Error('No se pudo obtener el listado de películas de SWAPI');
    }

    const films = response.data.result;

    const existingMovies = await this.movieRepository.find();
    const existingSwapiIds = new Set(existingMovies.map(m => m.swapiId));

    const newFilms = films.filter(film => !existingSwapiIds.has(film.uid));

    const inserted: Movie[] = [];
    for (const film of newFilms) {
      const props = film.properties;
      const movie = this.movieRepository.create({
        title: props.title,
        episodeId: props.episode_id,
        openingCrawl: props.opening_crawl,
        director: props.director,
        producer: props.producer,
        releaseDate: props.release_date,
        swapiId: film.uid,
        characters: props.characters || [],
        planets: props.planets || [],
        starships: props.starships || [],
        vehicles: props.vehicles || [],
        species: props.species || [],
      });
      const saved = await this.movieRepository.save(movie);
      inserted.push(saved);
    }
    return { insertedCount: inserted.length, inserted };
  }
} 