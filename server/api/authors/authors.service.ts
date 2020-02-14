import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Author } from '../../database/entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<object> {
    return this.authorRepository.find();
  }

  async findById(id): Promise<object> {
    if (await this.authorRepository.findOne(id)) {
      return this.authorRepository.findOne(id)
    }
    throw new HttpException('Author with this id doesn\'t exists', HttpStatus.NO_CONTENT);
  }

  async findByName(firstName, lastName): Promise<object> {
    if (await this.authorRepository.findOne({ firstName, lastName })) {
      return this.authorRepository.findOne({ firstName, lastName })
    }
      throw new HttpException('Author with this first and last name doesn\'t exists', HttpStatus.NO_CONTENT);
  }

  async create(author: Author): Promise<object> {
    if (author.firstName && author.lastName) {
      return this.authorRepository.save(author);
    }
    throw new HttpException('Please, provide both, author\'s first and last name', HttpStatus.BAD_REQUEST);
  }

  async update(id, author: Author): Promise<object> {
    if (await this.authorRepository.findOne(id)) {
      await this.authorRepository.update(id, JSON.parse(JSON.stringify(author)));
      return { status: 200, authorId: id, description: 'Updated' };
    }
    throw new HttpException('Author with this id doesn\'t exists', HttpStatus.NO_CONTENT);
  }

  async delete(id): Promise<object> {
    if (await this.authorRepository.findOne(id)) {
      await this.authorRepository.delete(id);
      return { status: 200, authorId: id, description: 'Deleted' };
    }
    throw new HttpException('Author with this id doesn\'t exists', HttpStatus.NO_CONTENT);
  }

  async getOrCreateAuthor(book) {
    const authorName = await JSON.stringify(book.author).replace(/['"]+/g, '');
    const separatedName = await authorName.trim().split(' ');
    const existingAuthor =
      await this.authorRepository.findOne({ firstName: separatedName[0], lastName: separatedName[1] }) ||
      await this.authorRepository.findOne({ firstName: separatedName[1], lastName: separatedName[0] });
    if (existingAuthor) {
      book.author = existingAuthor;
    } else {
      let newAuthor = { firstName: separatedName[0], lastName: separatedName[1] };
      await this.authorRepository.save(newAuthor).then((author) => {
        newAuthor = author
      });
      book.author = newAuthor;
    }
    return book;
  }
}
