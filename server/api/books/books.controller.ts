import { Body, Controller, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Book } from '../../database/entities/book.entity';
import { BooksService } from './books.service';

@ApiTags('book')
@Controller('api/book')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @ApiResponse({ status: 200, description: 'Show book by iban.'})
  @ApiResponse({ status: 204, description: 'Book with this iban doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('/iban/:iban')
  async findByIban(@Param('iban') iban: number) {
    return this.bookService.findByIban(iban);
  }

  @ApiResponse({ status: 200, description: 'Show book by title.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('/title/:title')
  async findByTitle(@Param('title') title: string) {
    return this.bookService.findByTitle(title);
  }

  @ApiResponse({ status: 200, description: 'Show book by author.'})
  @ApiResponse({ status: 204, description: 'Book by this author doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('/author/:authorFirstName/:authorLastName')
  async findByAuthor(@Param('authorFirstName') authorFirstName: string,
                     @Param('authorLastName') authorLastName: string) {
    const name = [authorFirstName, authorLastName];
    return this.bookService.findByAuthor(name);
  }

  @ApiResponse({ status: 200, description: 'Create book.' })
  @ApiResponse({ status: 400, description: 'Should be indicated title, author and iban.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('create')
  async createBook(@Body() book) {
    return this.bookService.create(plainToClass(Book, book, { excludeExtraneousValues: true }));
  }

  @ApiResponse({ status: 200, description: 'Book update.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Put('/:iban/update')
  async update(@Param('iban') iban, @Body() book) {
    book.iban = iban;
    return this.bookService.update(plainToClass(Book, book, { excludeExtraneousValues: true }));
  }

  @ApiResponse({ status: 200, description: 'Book delete.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete('/:iban/delete')
  async deleteComment(@Param('iban') iban) {
    return this.bookService.delete(iban);
  }

}