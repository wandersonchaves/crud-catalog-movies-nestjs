import { createParamDecorator } from '@nestjs/common';
import { Movie } from './movie.entity';

export const GetMovie = createParamDecorator((data, req): Movie => {
  const movie = req.args[0].movie;
  return movie;
});
