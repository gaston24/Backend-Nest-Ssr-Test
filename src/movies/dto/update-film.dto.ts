import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFilmDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  episode_id?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  opening_crawl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  director?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  producer?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  release_date?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  characters?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  planets?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  starships?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  vehicles?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  species?: string[];
} 