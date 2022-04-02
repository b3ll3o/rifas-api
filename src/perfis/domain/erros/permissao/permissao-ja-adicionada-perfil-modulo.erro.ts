import { BadRequestException } from '@nestjs/common';
import { MensagemErro } from '../mensagem.erro';

export class PerfilModuloPermissaoJaCadastradoErro extends BadRequestException {
  constructor() {
    super(MensagemErro.PERFIL_MODULO_PERMISSAO_JA_CADASTRADO);
  }
}
