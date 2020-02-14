import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../../database/entities/author.entity';
import { Book } from '../../database/entities/book.entity';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @Inject(AuthorsService)
    private authorsService
  ) {}

  async findByIban(iban): Promise<object> {
    if (await this.bookRepository.findOne({ iban })) {
      return this.bookRepository.findOne({ iban });
    }
    throw new HttpException('Book with this iban doesn\'t exists', HttpStatus.NO_CONTENT);
  }

  async findByTitle(title): Promise<object> {
    const books = await this.bookRepository.find({ title });
    if (Object.keys(books).length !== 0) {
      return this.bookRepository.find({ title })
    }
      throw new HttpException('Book with this title doesn\'t exists', HttpStatus.NO_CONTENT);
  }

  async findByAuthor(name): Promise<object> {
    const author =
      await this.authorRepository.findOne({ firstName: name[0], lastName: name[1] }) ||
      await this.authorRepository.findOne({ firstName: name[1], lastName: name[0] });
    if (author) {
      return this.bookRepository.find({ where: { author: { $eq: author } } });
    }
    throw new HttpException('No books by this author', HttpStatus.NO_CONTENT);
  }

  async create(book: Book): Promise<object> {
    if (book.title && book.author && book.iban) {
      book = await this.authorsService.getOrCreateAuthor(book);
      return this.bookRepository.save(book);
    }
    throw new HttpException('Please, provide both book\'s title, author and iban', HttpStatus.BAD_REQUEST);
  }

  async update(book: Book): Promise<object> {
    if (await this.bookRepository.findOne({ iban: book.iban })) {
      book = await this.authorsService.getOrCreateAuthor(book);
      await this.bookRepository.update({ iban: book.iban }, JSON.parse(JSON.stringify(book)));
      return  { status: 200, bookIban: book.iban, description: 'Updated' };
    }
    throw new HttpException('Book with this iban doesn\'t exists', HttpStatus.NO_CONTENT);
  }

  async delete(iban): Promise<object> {
    if (await this.bookRepository.findOne({ iban })) {
      await this.bookRepository.delete({ iban });
      return { status: 200, bookIban: iban, description: 'Deleted' };
    }
    throw new HttpException('Book with this iban doesn\'t exists', HttpStatus.NO_CONTENT);
  }
}
