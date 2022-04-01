import { Entidade } from '../../../shared/entidade';

export class UsuarioCadastradoDto extends Entidade<UsuarioCadastradoDto> {
  id: number;
  email: string;
}
