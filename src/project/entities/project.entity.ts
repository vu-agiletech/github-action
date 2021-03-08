import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Project')
export class ProjectEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public name: string;

  @Column()
  public language: string;

  @CreateDateColumn()
  public createAt: Date;

  @UpdateDateColumn()
  public updateAt: Date;

  constructor(name: string, language: string, createAt: Date, updateAt: Date) {
    this.name = name;
    this.language = language;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }
}
