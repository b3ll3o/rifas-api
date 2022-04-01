import { BadRequestException } from '@nestjs/common';
import { MensagemErro } from '../mensagem.erro';

export class PerfilJaCadastradoErro extends BadRequestException {
  constructor() {
    super(MensagemErro.PERFIL_JA_CADASTRADO);
  }
}
