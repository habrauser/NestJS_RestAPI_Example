import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn, BeforeUpdate,
} from 'typeorm';
import { IsNotEmpty, IsDateString } from 'class-validator';
import { Expose } from 'class-transformer';
import Author from './author.entity';

@Entity()
export class Book extends BaseEntity {

  @Expose()
  @ObjectIdColumn()
  _id: ObjectID;

  @Expose()
  @Column()
  @IsNotEmpty()
  title: string;

  @Expose()
  @Column()
  @IsNotEmpty()
  author: object;

  @Expose()
  @Column({ unique: true })
  @IsNotEmpty()
  iban: number;

  @Expose()
  @IsDateString()
  publishedAt: Date;

  @Expose()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Expose()
  @UpdateDateColumn({ type: 'timestamp', nullable: true  })
  updatedAt: Date;

  // Not working
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToOne(type => Author, author => author.books)
  owner: Author;
}

export default Book;