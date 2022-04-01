import { BadRequestException } from '@nestjs/common';
import { MensagemErro } from '../mensagem.erro';

export class ModuloJaCadastradoErro extends BadRequestException {
  constructor() {
    super(MensagemErro.MODULO_JA_CADASTRADO);
  }
}
