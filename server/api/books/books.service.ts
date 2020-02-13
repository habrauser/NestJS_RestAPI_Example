import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../../database/entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findByIban(iban): Promise<object> {
    return await this.bookRepository.findOne(iban) || { status: 204, message: 'Book with this iban doesn\'t exists' };
  }

  async findByTitle(title): Promise<object> {
    return await this.bookRepository.findOne(title) || { status: 204, message: 'Book with this title doesn\'t exists' };
  }

/*  async findByAuthor() {

  }*/

  async create(book: Book): Promise<object> {
    return await this.bookRepository.save(book);
  }

  async update(book: Book): Promise<object> {
    if (await this.bookRepository.findOne(book.iban)) {
      await this.bookRepository.update(book.iban, book);
      return { status: 200, bookIban: book.iban, description: 'Updated' };
    }
    return { status: 204, description: 'Book with this iban doesn\'t exists' };
  }

  async delete(iban): Promise<object> {
    if (await this.bookRepository.findOne(iban)) {
      await this.bookRepository.delete(iban);
      return { status: 200, bookIban: iban, description: 'Deleted' };
    }
    return { status: 204, description: 'Book with this iban doesn\'t exists' };
  }
}
