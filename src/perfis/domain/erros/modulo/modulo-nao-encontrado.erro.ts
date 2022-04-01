import { NotFoundException } from '@nestjs/common';
import { MensagemErro } from '../mensagem.erro';

export class ModuloNaoEncontradoErro extends NotFoundException {
  constructor() {
    super(MensagemErro.MODULO_NAO_ENCONTRADO);
  }
}
