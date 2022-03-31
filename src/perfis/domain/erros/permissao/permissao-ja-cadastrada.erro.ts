import { BadRequestException } from "@nestjs/common";
import { MensagemErro } from "../mensagem.erro";

export class PermissaoJaCadastradoErro extends BadRequestException {
  constructor() {
    super(MensagemErro.PERMISSAO_JA_CADASTRADO);
  }
}