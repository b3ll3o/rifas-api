import { NotFoundException } from '@nestjs/common';
import { MensagemErro } from '../mensagem.erro';

export class PerfilNaoEncontradoErro extends NotFoundException {
  constructor() {
    super(MensagemErro.PERFIL_NAO_ENCONTRADO);
  }
}
