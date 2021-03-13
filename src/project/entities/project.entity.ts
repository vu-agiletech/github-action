import { LanguageEntity } from 'src/language/entities/language.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Project')
export class ProjectEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => LanguageEntity)
  language: LanguageEntity;

  @Column()
  languageId: number;

  @Column()
  public name: string;

  @CreateDateColumn()
  public createAt: Date;

  @UpdateDateColumn()
  public updateAt: Date;

  constructor(
    name: string,
    languageId: number,
    createAt: Date,
    updateAt: Date,
  ) {
    this.name = name;
    this.languageId = languageId;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }
}
