import { IsString, IsOptional } from 'class-validator';
export class UpdateMovieDto {
  @IsOptional()
  @IsString({
    message: 'Informe um título de filme válido',
  })
  title: string;

  @IsOptional()
  @IsString({
    message: 'Informe uma descrição de filme válido',
  })
  description: string;

  @IsOptional()
  @IsString({
    message: 'Informe um diretor de filme válido',
  })
  director: string;

  @IsOptional()
  @IsString({
    message: 'Informe um gênero de filme válido',
  })
  genre: string;

  @IsOptional()
  @IsString({
    message: 'Informe um ator de filme válido',
  })
  actor: string;

  @IsOptional()
  status: boolean;
}
