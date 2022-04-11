import { IsNotEmpty } from 'class-validator';

export class NovaPermissaoDto {
  @IsNotEmpty()
  nome: string;
}
