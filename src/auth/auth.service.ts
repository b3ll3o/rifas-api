import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/domain/services/usuarios.service';
import { UsuarioAutenticadoDto } from './dtos/usuario-autenticado.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const usuario = await this.usuariosService.buscaUsuarioPorEmailAutenticavel(
      email,
    );
    if (usuario && usuario.senha === senha) {
      usuario.senha = undefined;
      return usuario;
    }
    return null;
  }

  async login(usuario: UsuarioAutenticadoDto) {
    const payload = { email: usuario.email, sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
