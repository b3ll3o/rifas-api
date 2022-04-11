import { Injectable } from '@nestjs/common';
import { Permissao } from '../../domain/entities/permissao.entity';
import { PermissaoService } from '../../domain/services/permissao.service';
import { NovaPermissaoDto, PermissaoCadastradaDto } from '../dtos';

@Injectable()
export class PermissaoApplicationService {
  constructor(private readonly permissaoService: PermissaoService) {}

  async cadastrar(
    usuarioId: number,
    novaPermissaoDto: NovaPermissaoDto,
  ): Promise<PermissaoCadastradaDto> {
    const permissaoCadastrada = await this.permissaoService.cadastrar(
      usuarioId,
      new Permissao(novaPermissaoDto),
    );
    return new PermissaoCadastradaDto(permissaoCadastrada);
  }
}
