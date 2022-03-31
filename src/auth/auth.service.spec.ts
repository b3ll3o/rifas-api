import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/domain/entities/usuario.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local/local.strategy';
import { Connection, getConnection } from 'typeorm';
import { UsuariosService } from '../usuarios/domain/services/usuarios.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constants';

const EMAIL = 'teste@teste.com';

describe('AuthService', () => {
  let service: AuthService;
  let connection: Connection;
  let usuariosService: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, LocalStrategy, JwtStrategy],
      imports: [
        UsuariosModule,
        PassportModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      controllers: [AuthController],
    }).compile();

    usuariosService = module.get(UsuariosService);
    service = module.get<AuthService>(AuthService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('deve retorna null caso email não esteja cadastrado', async () => {
      const res = await service.validateUser('', '');
      expect(res).toBeNull();
    });

    it('deve fazer o login caso usuario cadastrado', async () => {
      await usuariosService.cadastraNovoUsuario(
        new Usuario({ email: EMAIL, senha: 'senha' }),
      );
      const res = await service.validateUser(EMAIL, 'senha');
      expect(res.email).toBe(EMAIL);
      expect(res.senha).toBeUndefined();
    });

    it('deve retorna null caso senha seja invalida', async () => {
      await usuariosService.cadastraNovoUsuario(
        new Usuario({ email: EMAIL, senha: 'senha' }),
      );
      const res = await service.validateUser(EMAIL, 'invalida');
      expect(res).toBeNull();
    });
  });
});
