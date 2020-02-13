import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Author from './database/entities/author.entity';
import Book from './database/entities/book.entity';
import { AuthorsModule } from './api/authors/authors.module';
import { BooksModule } from './api/books/books.module';
import { apiToken } from './middleware/apiToken.middleware';
import { AuthorsController } from './api/authors/authors.controller';
import { BooksController } from './api/books/books.controller';

@Module({
  imports: [
    AuthorsModule,
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(apiToken)
      .forRoutes(AuthorsController, BooksController);
  }
}
