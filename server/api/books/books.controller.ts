import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import Author from '../../database/entities/author.entity';

@ApiTags('book')
@Controller('book')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @ApiResponse({ status: 200, description: 'Show book by iban.'})
  @ApiResponse({ status: 204, description: 'Book with this iban doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':iban')
  async findByIban(@Param('iban') iban: number) {
    return this.bookService.findByIban(iban);
  }

  @ApiResponse({ status: 200, description: 'Show book by title.'})
  @ApiResponse({ status: 204, description: 'Book with this title doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':title')
  async findByTitle(@Param('title') title: string) {
    return this.bookService.findByTitle(title);
  }

  @ApiResponse({ status: 200, description: 'Show book by author.'})
  @ApiResponse({ status: 204, description: 'Book by this author doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':author')
  async findByAuthor(@Param('author') author: string) {
    return this.bookService.findByTitle(author);
  }

  @ApiResponse({ status: 200, description: 'Create book.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('create')
  async createBook(@Body() book) {
    return await this.bookService.create(book);
  }

  @ApiResponse({ status: 200, description: 'Book update.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Put('/:iban/update')
  async update(@Param('iban') iban, @Body() book) {
    book.iban = iban;
    return await this.bookService.update(book);
  }

  @ApiResponse({ status: 200, description: 'Book delete.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete(':iban/delete')
  async deleteComment(@Param('iban') iban) {
    return await this.bookService.delete(iban);
  }

}