import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modulo } from '../entities/modulo.entity';
import { ModuloJaCadastradoErro } from '../erros';
import { RastreamentoService } from '../../../shared/services/rastreamento.service';

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo)
    private moduloRepository: Repository<Modulo>,
    private readonly rastreamentoService: RastreamentoService<Modulo>,
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
}
