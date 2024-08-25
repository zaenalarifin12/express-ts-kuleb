import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
