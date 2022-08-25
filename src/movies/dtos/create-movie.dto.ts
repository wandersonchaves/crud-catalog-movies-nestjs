import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({
    message: 'Informe o título do filme',
  })
  @MaxLength(200, {
    message: 'O título do filme deve ter menos de 200 caracteres',
  })
  title: string;

  @IsNotEmpty({
    message: 'Informe a descrição do filme',
  })
  @MaxLength(200, {
    message: 'A descrição do filme deve ter menos de 200 caracteres',
  })
  description: string;

  @IsNotEmpty({
    message: 'Informe o diretor do filme',
  })
  @MinLength(6, {
    message: 'O diretor do filme deve ter no mínimo 6 caracteres',
  })
  director: string;

  @IsNotEmpty({
    message: 'Informe o gênero do filme',
  })
  @MinLength(6, {
    message: 'O gênero do filme deve ter no mínimo 6 caracteres',
  })
  genre: string;

  @IsNotEmpty({
    message: 'Informe o ator do filme',
  })
  @MinLength(6, {
    message: 'O ator do filme deve ter no mínimo 6 caracteres',
  })
  actor: string;
}
