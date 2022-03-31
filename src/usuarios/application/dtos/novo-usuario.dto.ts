import { IsEmail, IsNotEmpty } from 'class-validator';

export class NovoUsuarioDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  senha: string;
}
