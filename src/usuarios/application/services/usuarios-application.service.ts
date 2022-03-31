import { Injectable } from '@nestjs/common';
import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuariosService } from '../../domain/services/usuarios.service';
import { NovoUsuarioDto, UsuarioCadastradoDto } from '../dtos';

@Injectable()
export class UsuariosApplicationservice {
  constructor(private readonly usuariosService: UsuariosService) {}

  async cadastraNovoUsuario(
    novoUsuarioDto: NovoUsuarioDto,
  ): Promise<UsuarioCadastradoDto> {
    const usuario = await this.usuariosService.cadastraNovoUsuario(
      new Usuario({ ...novoUsuarioDto }),
    );
    return new UsuarioCadastradoDto({ ...usuario });
  }

  async buscaUsuarioPorId(id: number): Promise<UsuarioCadastradoDto> {
    const usuario = await this.usuariosService.buscaUsuarioPorId(id);
    return new UsuarioCadastradoDto({ ...usuario });
  }
}
