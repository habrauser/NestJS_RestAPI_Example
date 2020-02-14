import { Module } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../../database/entities/author.entity';
import { Book } from '../../database/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  providers: [AuthorsService ,BooksService],
  controllers: [BooksController]
})
export class BooksModule {}
