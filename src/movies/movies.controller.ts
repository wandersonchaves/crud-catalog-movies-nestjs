import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { ReturnMovieDto } from './dtos/return-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { GetMovie } from './get-movie.decorator';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
@UseGuards(AuthGuard(), RolesGuard)
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

  @Get(':id')
  async findMovieById(@Param('id') id): Promise<ReturnMovieDto> {
    const movie = await this.moviesService.findMovieById(id);
    return {
      movie,
      message: 'Filme encontrado',
    };
  }

  @Patch(':id')
  async updateMovie(
    @Body(ValidationPipe) updateMovieDto: UpdateMovieDto,
    @GetMovie() movie: Movie,
    @Param('id') id: string,
  ) {
    if (movie.id.toString() != id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.moviesService.updateMovie(updateMovieDto, id);
    }
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    await this.moviesService.deleteMovie(id);
    return {
      message: 'Filme removido com sucesso',
    };
  }
}
