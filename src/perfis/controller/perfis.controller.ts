import { Body, Controller, Param, Post, Request } from '@nestjs/common';
import { NovoPerfilDto, PerfilModuloCadastradoDto } from '../application/dtos';
import { PerfilCadastradoDto } from '../application/dtos/perfil/perfil-cadastrado.dto';
import { PerfilApplicationService } from '../application/services/perfil-application.service';

@Controller('perfis')
export class PerfisController {
  constructor(
    private readonly perfilApplicationService: PerfilApplicationService,
  ) {}

  @Post()
  async cadastrar(
    @Request() req,
    @Body() novoPerfilDto: NovoPerfilDto,
  ): Promise<PerfilCadastradoDto> {
    return this.perfilApplicationService.cadastrar(req.user.id, novoPerfilDto);
  }

  @Post(':perfilId/modulos/:moduloId')
  async adicionaPerfilModulo(
    @Request() req,
    @Param('perfilId') perfilId: number,
    @Param('moduloId') moduloId: number,
  ): Promise<PerfilModuloCadastradoDto> {
    return this.perfilApplicationService.adicionaModuloPerfil(
      req.user.id,
      perfilId,
      moduloId,
    );
  }
}
