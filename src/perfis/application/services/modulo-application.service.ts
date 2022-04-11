import { Injectable } from '@nestjs/common';
import { Modulo } from '../../../perfis/domain/entities/modulo.entity';
import { ModuloService } from '../../domain/services/modulo.service';
import { ModuloCadastradoDto, NovoModuloDto } from '../dtos';

@Injectable()
export class ModuloApplicationService {
  constructor(private readonly moduloService: ModuloService) {}

  async cadastrar(
    novoModulolDto: NovoModuloDto,
  ): Promise<ModuloCadastradoDto> {
    const { usuarioId } = novoModulolDto;
    const moduloCadastrado = await this.moduloService.cadastrar(
      usuarioId,
      new Modulo(novoModulolDto),
    );
    return new ModuloCadastradoDto(moduloCadastrado);
  }
}
