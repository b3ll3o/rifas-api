import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permissao } from "../entities/permissao.entity";
import { PermissaoJaCadastradoErro } from "../erros";

@Injectable()
export class PermissaoService {
  constructor(
    @InjectRepository(Permissao)
    private permissaoRepository: Repository<Permissao>,
  ) {}

  async cadastrar(permissao: Permissao): Promise<Permissao> {
    const perfilEncontrado = await this.permissaoJaCadastrado(permissao.nome);
    if(perfilEncontrado) {
      throw new PermissaoJaCadastradoErro();
    }
    return this.permissaoRepository.save(permissao);
  }

  async permissaoJaCadastrado(nome: string): Promise<Permissao | undefined> {
    return this.permissaoRepository.findOne({where: {nome}});
  }
}