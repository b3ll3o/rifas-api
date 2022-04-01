import { Entidade } from '../../shared/entidade';

export class UsuarioAutenticadoDto extends Entidade<UsuarioAutenticadoDto> {
  id: number;
  email: string;
}
