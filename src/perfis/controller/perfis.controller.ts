import { Body, Controller, Post } from '@nestjs/common';
import { NovoPerfilDto } from '../application/dtos';
import { PerfilCadastradoDto } from '../application/dtos/perfil/perfil-cadastrado.dto';
import { PerfilApplicationService } from '../application/services/perfil-application.service';

@Controller('perfis')
export class PerfisController {
  constructor(
    private readonly perfilApplicationService: PerfilApplicationService,
  ) {}

  @Post()
  async cadastrar(
    @Body() novoPerfilDto: NovoPerfilDto,
  ): Promise<PerfilCadastradoDto> {
    return this.perfilApplicationService.cadastrar(novoPerfilDto);
  }
}
