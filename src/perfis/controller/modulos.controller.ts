import { Body, Controller, Post } from '@nestjs/common';
import { ModuloCadastradoDto, NovoModuloDto } from '../application/dtos';
import { ModuloApplicationService } from '../application/services/modulo-application.service';

@Controller('modulos')
export class ModulosController {
  constructor(
    private readonly moduloApplicationService: ModuloApplicationService,
  ) {}

  @Post()
  async cadastrar(
    @Body() novoModuloDto: NovoModuloDto,
  ): Promise<ModuloCadastradoDto> {
    return this.moduloApplicationService.cadastrar(novoModuloDto);
  }
}
