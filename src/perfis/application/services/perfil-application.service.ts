import { Injectable } from '@nestjs/common';
import { PerfilModuloService } from '../../domain/services/perfil-modulo.service';
import { Perfil } from '../../domain/entities/perfil.entity';
import { PerfilService } from '../../domain/services/perfil.service';
import { NovoPerfilDto, PerfilModuloCadastradoDto } from '../dtos';
import { PerfilCadastradoDto } from '../dtos/perfil/perfil-cadastrado.dto';

@Injectable()
export class PerfilApplicationService {
  constructor(
    private readonly perfilService: PerfilService,
    private readonly perfilModuloService: PerfilModuloService,
  ) {}

  async cadastrar(
    usuarioId: number,
    novoPerfilDto: NovoPerfilDto,
  ): Promise<PerfilCadastradoDto> {
    const perfilCadastrado = await this.perfilService.cadastrar(
      usuarioId,
      new Perfil(novoPerfilDto),
    );
    return new PerfilCadastradoDto(perfilCadastrado);
  }

  async adicionaModuloPerfil(
    usuarioId: number,
    perfilId: number,
    moduloId: number,
  ): Promise<PerfilModuloCadastradoDto> {
    const perfilModulo = this.perfilModuloService.adicionaPerfilModulo(
      usuarioId,
      perfilId,
      moduloId,
    );
    return new PerfilModuloCadastradoDto(perfilModulo);
  }
}
