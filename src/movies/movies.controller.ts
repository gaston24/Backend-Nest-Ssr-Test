import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SwapiService } from './services/swapi.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../users/entities/user.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly swapiService: SwapiService) {}

  @Get()
  async findAll() {
    return this.swapiService.getFilms();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.swapiService.getFilmById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  async create(@Body() createFilmDto: CreateFilmDto) {
    return this.swapiService.createFilm(createFilmDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.swapiService.updateFilm(id, updateFilmDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  async remove(@Param('id') id: string) {
    return this.swapiService.deleteFilm(id);
  }

  @Post('sync')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  async syncFilms() {
    return this.swapiService.syncFilms();
  }
}
