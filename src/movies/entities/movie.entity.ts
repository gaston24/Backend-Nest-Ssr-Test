import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'episode_id' })
  episodeId: number;

  @Column({ name: 'opening_crawl', type: 'text' })
  openingCrawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column({ name: 'release_date' })
  releaseDate: string;

  @Column({ type: 'text', nullable: true })
  private _characters: string | null;

  @Column({ type: 'text', nullable: true })
  private _planets: string | null;

  @Column({ type: 'text', nullable: true })
  private _starships: string | null;

  @Column({ type: 'text', nullable: true })
  private _vehicles: string | null;

  @Column({ type: 'text', nullable: true })
  private _species: string | null;

  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];

  @Column({ name: 'swapi_id', unique: true })
  swapiId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @AfterLoad()
  convertArrays() {
    this.characters = this._characters ? JSON.parse(this._characters) : [];
    this.planets = this._planets ? JSON.parse(this._planets) : [];
    this.starships = this._starships ? JSON.parse(this._starships) : [];
    this.vehicles = this._vehicles ? JSON.parse(this._vehicles) : [];
    this.species = this._species ? JSON.parse(this._species) : [];
  }

  @BeforeInsert()
  @BeforeUpdate()
  convertArraysToString() {
    this._characters = this.characters ? JSON.stringify(this.characters) : null;
    this._planets = this.planets ? JSON.stringify(this.planets) : null;
    this._starships = this.starships ? JSON.stringify(this.starships) : null;
    this._vehicles = this.vehicles ? JSON.stringify(this.vehicles) : null;
    this._species = this.species ? JSON.stringify(this.species) : null;
  }
} 