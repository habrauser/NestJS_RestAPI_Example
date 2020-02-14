import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthorsModule } from '../../server/api/authors/authors.module';
import { AuthorsService } from '../../server/api/authors/authors.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Author from '../../server/database/entities/author.entity';
import Book from '../../server/database/entities/book.entity';

describe('Testing authors api endpoints', () => {
  const authorsService = {
    findAll: () => ['all'],
    findById: () => ['author'],
    findByName: () => ['author'],
    create: () => ['author'],
    update: () => ['author'],
    delete: () => ['author'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthorsModule,
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
      .overrideProvider(AuthorsService)
      .useValue(authorsService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET authors`, () => {
    return request(app.getHttpServer())
      .get('/api/author/all')
      .expect(200)
      .expect(authorsService.findAll());
  });

  it(`/GET by ID`, () => {
    return request(app.getHttpServer())
      .get('/api/author/{:id}')
      .expect(200)
      .expect(authorsService.findById());
  });

  it(`/GET by first and last name`, () => {
    return request(app.getHttpServer())
      .get('/api/author/{:firstName}/{:lastName}')
      .expect(200)
      .expect(authorsService.findByName());
  });

  it(`/POST create author`, () => {
    return request(app.getHttpServer())
      .post('/api/author/create')
      .set(authorsService.create())
      .expect(201);
  });

  it(`/PUT update author`, () => {
    return request(app.getHttpServer())
      .put('/api/author/{:id}/update')
      .set(authorsService.update())
      .expect(200);
  });

  it(`/DELETE delete author`, () => {
    return request(app.getHttpServer())
      .delete('/api/author/{:id}/delete')
      .set(authorsService.update())
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});