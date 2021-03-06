import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Language')
export class LanguageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  language: string;

  @Column()
  publishYear: number;

  @Column()
  author: string;

  constructor(
    id: number,
    language: string,
    publishYear: number,
    author: string,
  ) {
    this.id = id;
    this.language = language;
    this.publishYear = publishYear;
    this.author = author;
  }
}
