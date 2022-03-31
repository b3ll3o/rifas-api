import { Injectable } from "@nestjs/common";
import { Permissao } from "../entities/permissao.entity";

@Injectable()
export class PermissaoService {
  constructor() {}

  async cadastrar(permissao: Permissao) {
    return permissao;
  }
}