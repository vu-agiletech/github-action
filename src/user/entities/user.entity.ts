import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
