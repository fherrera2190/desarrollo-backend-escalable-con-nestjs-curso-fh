import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', { unique: true })
  email: string;
  @Column('text', { select: false })
  password: string;
  @Column('text')
  fullName: string;
  @Column('bool', { default: true })
  isActive: boolean;
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  // @BeforeInsert()
  // encryptPassword() {
  //   this.password = bcrypt.hashSync(this.password, 10);
  // }
}
