import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modulo } from '../entities/modulo.entity';
import { ModuloJaCadastradoErro, ModuloNaoEncontradoErro } from '../erros';
import { RastreamentoService } from '../../../shared/services/rastreamento.service';
import { PermissaoService } from './permissao.service';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo)
    private moduloRepository: Repository<Modulo>,
    private readonly rastreamentoService: RastreamentoService<Modulo>,
    private readonly permissaoService: PermissaoService,
  ) {}

  async cadastrar(usuarioId: number, modulo: Modulo): Promise<Modulo> {
    const perfilEncontrado = await this.moduloJaCadastrado(modulo.nome);
    if (perfilEncontrado) {
      throw new ModuloJaCadastradoErro();
    }
    const moduloRastreavel =
      await this.rastreamentoService.adicionaRastreioInclusao(
        usuarioId,
        modulo,
      );

    return this.moduloRepository.save(moduloRastreavel);
  }

  async moduloJaCadastrado(nome: string): Promise<Modulo | undefined> {
    return this.moduloRepository.findOne({ where: { nome } });
  }

  async buscaPorId(id: number): Promise<Modulo> {
    const modulo = await this.moduloRepository.findOne(id);
    if (!modulo) {
      throw new ModuloNaoEncontradoErro();
    }
    return modulo;
  }

  async adicionaPermissaoModulo(moduloId: number, permissaoId: number): Promise<Modulo> {
    const modulo = await this.buscaPorId(moduloId);
    const permissao = await this.permissaoService.buscaPorId(permissaoId);

    modulo.adicionaPermissao(permissao);

    return this.moduloRepository.save(modulo);
  }
}
