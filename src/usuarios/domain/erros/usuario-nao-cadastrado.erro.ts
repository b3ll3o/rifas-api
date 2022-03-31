import { NotFoundException } from '@nestjs/common';
import { MensagemErro } from './mensagem-erros.enum';

export class UsuarioNaoEncontrado extends NotFoundException {
  constructor() {
    super(MensagemErro.USUARIO_NAO_ENCONTRADO);
  }
}
