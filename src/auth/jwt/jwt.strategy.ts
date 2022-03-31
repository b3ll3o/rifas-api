import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { TokenJwtDto } from '../dtos/token-jwt.dto';
import { UsuarioAutenticadoDto } from '../dtos/usuario-autenticado.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: TokenJwtDto): Promise<UsuarioAutenticadoDto> {
    return new UsuarioAutenticadoDto({ id: payload.sub, email: payload.email });
  }
}
