import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private movieRepository: MovieRepository,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.createMovie(createMovieDto);
  }

  async findMovieById(movieId: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne(movieId, {
      select: ['title', 'description', 'director', 'genre', 'actor'],
    });

    if (!movie) throw new NotFoundException('Filme não encontrado');

    return movie;
  }

  async updateMovie(
    updateMovieDto: UpdateMovieDto,
    id: string,
  ): Promise<Movie> {
    const movie = await this.findMovieById(id);
    const { title, description, director, genre, actor, status } =
      updateMovieDto;
    movie.title = title ? title : movie.title;
    movie.description = description ? description : movie.description;
    movie.director = director ? director : movie.director;
    movie.genre = genre ? genre : movie.genre;
    movie.actor = actor ? actor : movie.actor;
    movie.status = status === undefined ? movie.status : status;
    try {
      await movie.save();
      return movie;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async deleteMovie(movieId: string) {
    const result = await this.movieRepository.delete({ id: movieId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um filme com o ID informado',
      );
    }
  }
}
