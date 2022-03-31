import { BadRequestException } from '@nestjs/common';
import { MensagemErro } from './mensagem-erros.enum';

export class UsuarioJaCadastradoErro extends BadRequestException {
  constructor() {
    super(MensagemErro.USUARIO_JA_CADASTRADO);
  }
}
