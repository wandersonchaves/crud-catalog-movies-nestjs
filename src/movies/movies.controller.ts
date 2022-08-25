import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { ReturnMovieDto } from './dtos/return-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  async createMovie(
    @Body(ValidationPipe) createMovieDto: CreateMovieDto,
  ): Promise<ReturnMovieDto> {
    const movie = await this.moviesService.createMovie(createMovieDto);
    return {
      movie,
      message: 'Filme cadastrado com sucesso',
    };
  }
}
