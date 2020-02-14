import {
  BaseEntity,
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
import { Expose } from 'class-transformer';
import Book from './book.entity';

@Entity()
export class Author extends BaseEntity {
  @Expose()
  @ObjectIdColumn()
  _id: ObjectID;

  @Expose()
  @Column()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @Expose()
  @Column()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @Expose()
  @IsDateString()
  birthday: Date;

  @Expose()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Expose()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Not working
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @OneToMany(type => Book, book => book.author)
  books: Book[];
}

export default Author;