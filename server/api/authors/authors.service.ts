import { Injectable } from '@nestjs/common';
import { Author } from '../../database/entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findById(id): Promise<object> {
    return await this.authorRepository.findOne(id) || { status: 204, message: 'Author with this id doesn\'t exists' };
  }

  async findByName(firstName, lastName): Promise<object> {
    return await this.authorRepository.findOne({ firstName: firstName, lastName: lastName }) ||
      { status: 204, message: 'Author with this first and last name doesn\'t exists' };
  }

  async create(author: Author): Promise<object> {
    return await this.authorRepository.save(author);
  }

  async update(author: Author): Promise<object> {
    if (await this.authorRepository.findOne(author.id)) {
      await this.authorRepository.update(author.id, author);
      return { status: 200, authorId: author.id, description: 'Updated' };
    }
    return { status: 204, description: 'Author with this id doesn\'t exists' };
  }

  async delete(id): Promise<object> {
    if (await this.authorRepository.findOne(id)) {
      await this.authorRepository.delete(id);
      return { status: 200, authorId: id, description: 'Deleted' };
    }
    return { status: 204, description: 'Author with this id doesn\'t exists' };
  }
}
