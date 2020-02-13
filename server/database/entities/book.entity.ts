import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsDateString } from 'class-validator';
import Author from './author.entity';

@Entity()
export class Book extends BaseEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  author: object;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsDateString()
  iban: number;

  @Column()
  published_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true  })
  updated_at: Date;

  @ManyToOne(type => Author, author => author.books)
  owner: Author;
}

export default Book;