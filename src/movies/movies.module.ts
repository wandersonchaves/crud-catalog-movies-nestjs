import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './movie.repository';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
