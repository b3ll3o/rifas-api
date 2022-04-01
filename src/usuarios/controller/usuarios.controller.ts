import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NoAuth } from '../../auth/no-auth/no-auth.decorator';
import { NovoUsuarioDto, UsuarioCadastradoDto } from '../application/dtos';
import { UsuariosApplicationservice } from '../application/services/usuarios-application.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosApplicationService: UsuariosApplicationservice,
  ) {}

  @NoAuth()
  @Post()
  async cadastraNovoUsuario(
    @Body() novoUsuarioDto: NovoUsuarioDto,
  ): Promise<UsuarioCadastradoDto> {
    return this.usuariosApplicationService.cadastraNovoUsuario(novoUsuarioDto);
  }

  @Get(':id')
  async buscaUsuarioPorId(
    @Param('id') id: number,
  ): Promise<UsuarioCadastradoDto> {
    return this.usuariosApplicationService.buscaUsuarioPorId(id);
  }
}
