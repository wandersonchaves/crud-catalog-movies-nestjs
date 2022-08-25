import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, description, director, genre, actor } = createMovieDto;

    const movie = this.create();
    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.genre = genre;
    movie.actor = actor;
    try {
      await movie.save();
      return movie;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Título do filme já existe');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o filme no banco de dados',
        );
      }
    }
  }
}
