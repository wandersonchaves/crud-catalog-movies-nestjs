import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({
    message: 'Informe um titulo do filme',
  })
  @MaxLength(200, {
    message: 'O titulo do filme deve ter menos de 200 caracteres',
  })
  title: string;

  @IsNotEmpty({
    message: 'Informe a descricao do filme',
  })
  @MaxLength(200, {
    message: 'A descricao do filme deve ter menos de 200 caracteres',
  })
  description: string;

  @IsNotEmpty({
    message: 'Informe um diretor do filme',
  })
  @MinLength(6, {
    message: 'O diretor do filme deve ter no mínimo 6 caracteres',
  })
  director: string;

  @IsNotEmpty({
    message: 'Informe o genero do filme',
  })
  @MinLength(6, {
    message: 'O genero do filme deve ter no mínimo 6 caracteres',
  })
  genre: string;

  @IsNotEmpty({
    message: 'Informe o actor do filme',
  })
  @MinLength(6, {
    message: 'O actor do filme deve ter no mínimo 6 caracteres',
  })
  actor: string;
}
