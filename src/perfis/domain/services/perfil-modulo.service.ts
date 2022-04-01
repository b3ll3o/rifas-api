import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RastreamentoService } from '../../../shared/services/rastreamento.service';
import { Repository } from 'typeorm';
import { Modulo } from '../entities/modulo.entity';
import { PerfilModulo } from '../entities/perfil-modulo.entity';
import { Perfil } from '../entities/perfil.entity';
import { PerfilModuloJaCadastradoErro } from '../erros';
import { ModuloService } from './modulo.service';
import { PerfilService } from './perfil.service';

@Injectable()
export class PerfilModuloService {
  constructor(
    @InjectRepository(PerfilModulo)
    private perfilModuloRepository: Repository<PerfilModulo>,
    private perfilService: PerfilService,
    private moduloService: ModuloService,
    private rastreamentoService: RastreamentoService<PerfilModulo>,
  ) {}

  async adicionaPerfilModulo(
    usuarioId: number,
    perfilId: number,
    moduloId: number,
  ): Promise<PerfilModulo> {
    const perfil = await this.perfilService.buscaPorId(perfilId);
    const modulo = await this.moduloService.buscaPorId(moduloId);

    const perfilModuloEncontrado = await this.perfilModuloCadastrado(
      perfil,
      modulo,
    );
    if (perfilModuloEncontrado) {
      throw new PerfilModuloJaCadastradoErro();
    }

    const perfilModulo = new PerfilModulo({
      perfil,
      modulo,
    });

    const perfilModuloRastreavel =
      await this.rastreamentoService.adicionaRastreioInclusao(
        usuarioId,
        perfilModulo,
      );

    return this.perfilModuloRepository.save(perfilModuloRastreavel);
  }

  private async perfilModuloCadastrado(
    perfil: Perfil,
    modulo: Modulo,
  ): Promise<PerfilModulo> {
    const perfilModulo = await this.perfilModuloRepository.findOne({
      where: {
        perfil,
        modulo,
      },
    });

    return perfilModulo;
  }
}
