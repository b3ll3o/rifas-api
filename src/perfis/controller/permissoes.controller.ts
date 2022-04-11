import { Body, Controller, Post, Request } from '@nestjs/common';
import { NovaPermissaoDto, PermissaoCadastradaDto } from '../application/dtos';
import { PermissaoApplicationService } from '../application/services/permissao-application.service';

@Controller('permissoes')
export class PermissoesController {
  constructor(
    private readonly permissaoApplicationService: PermissaoApplicationService,
  ) {}

  @Post()
  async cadastrar(
    @Request() req,
    @Body() novaPermissaoDto: NovaPermissaoDto,
  ): Promise<PermissaoCadastradaDto> {
    return this.permissaoApplicationService.cadastrar(
      req.user.id,
      novaPermissaoDto,
    );
  }
}
