import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { BooksModule } from '../../server/api/books/books.module';
import { BooksService } from '../../server/api/books/books.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Author from '../../server/database/entities/author.entity';
import Book from '../../server/database/entities/book.entity';

describe('Testing books api endpoints', () => {
  const bookService = {
    findByIban: () => ['book'],
    findByTitle: () => ['book'],
    findByAuthor: () => ['book'],
    create: () => ['book'],
    update: () => ['book'],
    delete: () => ['book'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        BooksModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            type: 'mongodb' as 'mongodb',
            host: configService.get('TYPEORM_HOST'),
            database: configService.get('TYPEORM_DATABASE'),
            port: configService.get<number>('TYPEORM_PORT'),
            username: configService.get('TYPEORM_USERNAME'),
            password: configService.get('TYPEORM_PASSWORD'),
            entities: [Author, Book],
          }),
        })],
    })
      .overrideProvider(BooksService)
      .useValue(bookService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET by iban`, () => {
    return request(app.getHttpServer())
      .get('/api/book/iban/{:iban}')
      .expect(200)
      .expect(bookService.findByIban());
  });

  it(`/GET by title`, () => {
    return request(app.getHttpServer())
      .get('/api/book/title/{:title}')
      .expect(200)
      .expect(bookService.findByTitle());
  });

  it(`/GET by author's first and last name`, () => {
    return request(app.getHttpServer())
      .get('/api/book/author/{:firstName}/{:lastName}')
      .expect(200)
      .expect(bookService.findByAuthor());
  });

  it(`/POST create book`, () => {
    return request(app.getHttpServer())
      .post('/api/book/create')
      .set(bookService.create())
      .expect(201);
  });

  it(`/PUT update book`, () => {
    return request(app.getHttpServer())
      .put('/api/book/{:iban}/update')
      .set(bookService.update())
      .expect(200);
  });

  it(`/DELETE delete book`, () => {
    return request(app.getHttpServer())
      .delete('/api/book/{:iban}/delete')
      .set(bookService.update())
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});