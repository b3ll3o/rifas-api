import { Injectable } from '@nestjs/common';
import { Perfil } from '../../domain/entities/perfil.entity';
import { PerfilService } from '../../domain/services/perfil.service';
import { NovoPerfilDto } from '../dtos';
import { PerfilCadastradoDto } from '../dtos/perfil/perfil-cadastrado.dto';

@Injectable()
export class PerfilApplicationService {
  constructor(private readonly perfilService: PerfilService) {}

  async cadastrar(
    novoPerfilDto: NovoPerfilDto,
  ): Promise<PerfilCadastradoDto> {
    const { usuarioId } = novoPerfilDto;
    const perfilCadastrado = await this.perfilService.cadastrar(
      usuarioId,
      new Perfil(novoPerfilDto),
    );
    return new PerfilCadastradoDto(perfilCadastrado);
  }
}
