import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RastreamentoService } from '../../../shared/services/rastreamento.service';
import { Repository } from 'typeorm';
import { PerfilModuloPermissao } from '../entities/perfil-modulo-permissao.entity';
import { PerfilModuloService } from './perfil-modulo.service';
import { PermissaoService } from './permissao.service';
import { PerfilModulo } from '../entities/perfil-modulo.entity';
import { Permissao } from '../entities/permissao.entity';
import { PerfilModuloPermissaoJaCadastradoErro } from '../erros';

@Injectable()
export class PerfilModuloPermissaoService {
  constructor(
    @InjectRepository(PerfilModuloPermissao)
    private perfilModuloPermissaoRepository: Repository<PerfilModuloPermissao>,
    private perfilModuloService: PerfilModuloService,
    private permissaoService: PermissaoService,
    private rastreamentoService: RastreamentoService<PerfilModuloPermissao>,
  ) {}

  async cadastrar(
    usuarioId: number,
    perfilModuloId: number,
    permissaoId: number,
  ): Promise<PerfilModuloPermissao> {
    const perfilModulo = await this.perfilModuloService.buscaPorId(
      perfilModuloId,
    );
    const permissao = await this.permissaoService.buscaPorId(permissaoId);

    const perfilModuloPermissaoEncontrado =
      await this.perfilModuloPermissaoCadastrado(perfilModulo, permissao);
    if (perfilModuloPermissaoEncontrado) {
      throw new PerfilModuloPermissaoJaCadastradoErro();
    }

    const perfilModuloPermissao = new PerfilModuloPermissao({
      perfilModulo,
      permissao,
    });

    const perfilModuloPermissaoRastreavel =
      await this.rastreamentoService.adicionaRastreioInclusao(
        usuarioId,
        perfilModuloPermissao,
      );

    return this.perfilModuloPermissaoRepository.save(
      perfilModuloPermissaoRastreavel,
    );
  }

  private async perfilModuloPermissaoCadastrado(
    perfilModulo: PerfilModulo,
    permissao: Permissao,
  ) {
    return this.perfilModuloPermissaoRepository.findOne({
      where: { perfilModulo, permissao },
    });
  }
}
