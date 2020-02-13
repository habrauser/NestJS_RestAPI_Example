import { Body, Controller, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { Author } from '../../database/entities/author.entity';
import { AuthorsService } from './authors.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('author')
@Controller('author')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}

  //TODO show authors books

  @ApiResponse({ status: 200, description: 'All authors.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('all')
  async getAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Show author by id.'})
  @ApiResponse({ status: 204, description: 'Author with this id doesn\'t exists.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':id')
  async findById(@Param('id') id: number) {
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

  @ApiResponse({ status: 200, description: 'Create author.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('create')
  async createAuthor(@Body() author) {
    return await this.authorService.create(author);
  }

  @ApiResponse({ status: 200, description: 'Author update.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Put('/:id/update')
  async update(@Param('id') id, @Body() author) {
    author.id = id;
    return await this.authorService.update(author);
  }

  @ApiResponse({ status: 200, description: 'Author delete.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete(':id/delete')
  async deleteComment(@Param('id') id) {
    return await this.authorService.delete(id);
  }

}