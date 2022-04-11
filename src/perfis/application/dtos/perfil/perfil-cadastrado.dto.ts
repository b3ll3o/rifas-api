import { Entidade } from '../../../../shared/entidade';

export class PerfilCadastradoDto extends Entidade<PerfilCadastradoDto> {
  id: number;
  nome: string;
}
