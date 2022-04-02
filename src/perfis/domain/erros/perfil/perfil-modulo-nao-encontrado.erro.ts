import { NotFoundException } from '@nestjs/common';
import { MensagemErro } from '../mensagem.erro';

export class PerfilModuloNaoEncontradoErro extends NotFoundException {
  constructor() {
    super(MensagemErro.PERFIL_MODULO_NAO_ENCONTRADO);
  }
}
