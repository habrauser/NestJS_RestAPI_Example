import {
  BaseEntity, BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsDateString } from 'class-validator';
import Book from './book.entity';

@Entity()
export class Author extends BaseEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @Column()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsDateString()
  birthday: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  //Not working
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @OneToMany(type => Book, book => book.author)
  books: Book[];
}

export default Author;