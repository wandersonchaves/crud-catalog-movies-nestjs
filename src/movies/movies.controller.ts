import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { ReturnMovieDto } from './dtos/return-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  @UseGuards(AuthGuard())
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
