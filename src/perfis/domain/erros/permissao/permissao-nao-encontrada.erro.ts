import { NotFoundException } from '@nestjs/common';
import { MensagemErro } from '../mensagem.erro';

export class PermissaoNaoEncontradoErro extends NotFoundException {
  constructor() {
    super(MensagemErro.PERMISSAO_NAO_ENCONTRADO);
  }
}
