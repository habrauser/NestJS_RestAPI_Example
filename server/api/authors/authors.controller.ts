import { Body, Controller, Param, Get, Post, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from "class-transformer";
import { Author } from '../../database/entities/author.entity';
import { AuthorsService } from './authors.service';

@ApiTags('author')
@Controller('api/author')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}

  @ApiResponse({ status: 200, description: 'All authors.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('all')
  async findAll(): Promise<object> {
    return this.authorService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Show author by id.'})
  @ApiResponse({ status: 204, description: 'Author with this id doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Invalid id format.' })
  @Get(':id')
  async findById(@Param('id') id) {
    return this.authorService.findById(id);
  }

  @ApiResponse({ status: 200, description: 'Show author by first and last name.'})
  @ApiResponse({ status: 204, description: 'Author with this first and last name doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('/:firstName/:lastName')
  async findByName(@Param('firstName') firstName: string,
                   @Param('lastName') lastName: string) {
    return this.authorService.findByName(firstName, lastName);
  }

  @ApiResponse({ status: 201, description: 'Create author.' })
  @ApiResponse({ status: 400, description: 'Should be indicated first and last name.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('create')
  async createAuthor(@Body() author) {
    return this.authorService.create(plainToClass(Author, author, { excludeExtraneousValues: true }));
  }

  @ApiResponse({ status: 200, description: 'Author update.' })
  @ApiResponse({ status: 204, description: 'Author with this id doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Invalid id format.' })
  @Put('/:id/update')
  async update(@Param('id') id, @Body() author) {
    return this.authorService.update(id, plainToClass(Author, author, { excludeExtraneousValues: true }));
  }

  @ApiResponse({ status: 200, description: 'Author delete.' })
  @ApiResponse({ status: 204, description: 'Author with this id doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Invalid id format.' })
  @Delete('/:id/delete')
  async deleteComment(@Param('id') id) {
    return this.authorService.delete(id);
  }

}