import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  episodeId: number;

  @ApiProperty()
  @IsString()
  openingCrawl: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsString()
  producer: string;

  @ApiProperty()
  @IsString()
  releaseDate: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  characters?: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  planets?: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  starships?: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  vehicles?: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  species?: string[];

  @ApiProperty()
  @IsString()
  swapiId: string;
} 