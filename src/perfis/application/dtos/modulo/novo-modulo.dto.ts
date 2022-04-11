import { IsNotEmpty } from 'class-validator';

export class NovoModuloDto {
  @IsNotEmpty()
  nome: string;
}
