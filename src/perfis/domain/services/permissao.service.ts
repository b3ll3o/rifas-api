import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permissao } from "../entities/permissao.entity";
import { PermissaoJaCadastradoErro } from "../erros";
import { RastreamentoService } from "../../../shared/services/rastreamento.service";

@Injectable()
export class PermissaoService {
  constructor(
    @InjectRepository(Permissao)
    private permissaoRepository: Repository<Permissao>,
    private readonly rastreamentoService: RastreamentoService<Permissao>
  ) {}

  async cadastrar(usuarioId: number, permissao: Permissao): Promise<Permissao> {
    const perfilEncontrado = await this.permissaoJaCadastrado(permissao.nome);
    if(perfilEncontrado) {
      throw new PermissaoJaCadastradoErro();
    }
    const permissaoRastreavel = await this.rastreamentoService.adicionaRastreioInclusao(usuarioId, permissao)
    
    return this.permissaoRepository.save(permissaoRastreavel);
  }

  async permissaoJaCadastrado(nome: string): Promise<Permissao | undefined> {
    return this.permissaoRepository.findOne({where: {nome}});
  }
}