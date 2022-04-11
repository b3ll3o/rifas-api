import { IsNotEmpty } from 'class-validator';

export class NovoPerfilDto {
  @IsNotEmpty()
  nome: string;
}
