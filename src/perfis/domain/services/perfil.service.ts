import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfil } from '../entities/perfil.entity';
import { PerfilJaCadastradoErro } from '../erros';
import { RastreamentoService } from '../../../shared/services/rastreamento.service';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private perfilRepository: Repository<Perfil>,
    private readonly rastreamentoService: RastreamentoService<Perfil>,
  ) {}

  async cadastrar(usuarioId: number, perfil: Perfil): Promise<Perfil> {
    const perfilEncontrado = await this.perfilJaCadastrado(perfil.nome);
    if (perfilEncontrado) {
      throw new PerfilJaCadastradoErro();
    }

    const perfilRastreavel =
      await this.rastreamentoService.adicionaRastreioInclusao(
        usuarioId,
        perfil,
      );

    return this.perfilRepository.save(perfilRastreavel);
  }

  async perfilJaCadastrado(nome: string): Promise<Perfil | undefined> {
    return this.perfilRepository.findOne({ where: { nome } });
  }
}
