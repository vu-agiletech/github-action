import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cat')
export class CatEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column({ type: 'int' })
  age: number;

  constructor(name: string, breed: string, age: number) {
    this.name = name || '';
    this.breed = breed || '';
    this.age = age || NaN;
  }
}
