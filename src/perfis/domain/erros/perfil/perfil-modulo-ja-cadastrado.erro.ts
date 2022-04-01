import { BadRequestException } from '@nestjs/common';
import { MensagemErro } from '../mensagem.erro';

export class PerfilModuloJaCadastradoErro extends BadRequestException {
  constructor() {
    super(MensagemErro.PERFIL_MODULO_JA_CADASTRADO);
  }
}
