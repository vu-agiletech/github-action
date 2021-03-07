import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public username: string;

  @Column()
  public password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
