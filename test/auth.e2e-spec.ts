import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidadorPipe } from '../pipes/validador.pipe';
import { UsuariosService } from '../src/usuarios/domain/services/usuarios.service';
import { AuthModule } from '../src/auth/auth.module';
import { Usuario } from '../src/usuarios/domain/entities/usuario.entity';
import * as request from 'supertest';
import { JwtAuthGuard } from '../src/auth/jwt/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

const BASE_URL = '/auth';
const EMAIL = 'teste@teste.com';

describe('Auth', () => {
  let app: INestApplication;
  let usuariosService: UsuariosService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
      ],
    }).compile();

    usuariosService = module.get(UsuariosService);

    app = module.createNestApplication();
    const reflector = app.get(Reflector);
    app.useGlobalPipes(new ValidadorPipe());
    app.useGlobalGuards(new JwtAuthGuard(reflector));
    await app.init();
  });

  describe('login', () => {
    it('não deve fazer o login de um usuario não cadatrado', async () => {
      return request(app.getHttpServer())
        .post(`${BASE_URL}/login`)
        .send({ email: 'teste@teste.com', senha: 'senha' })
        .expect(401);
    });

    it('deve fazer o login de um usuario ja cadatrado', async () => {
      await usuariosService.cadastraNovoUsuario(
        new Usuario({ email: 'teste@teste.com', senha: 'senha' }),
      );

      const res = await request(app.getHttpServer())
        .post(`${BASE_URL}/login`)
        .send({ email: 'teste@teste.com', senha: 'senha' });

      expect(res.statusCode).toBe(201);
    });

    it('não deve fazer o login de um usuario com a senha errada', () => {
      return request(app.getHttpServer())
        .post(`${BASE_URL}/login`)
        .send({ email: 'teste@teste.com', senha: 'invalida' })
        .expect(401);
    });
  });

  describe('profile', () => {
    it('deve retorna um payload dado um bearer token valido', async () => {
      const res = await request(app.getHttpServer())
        .post(`${BASE_URL}/login`)
        .send({ email: 'teste@teste.com', senha: 'senha' });

      const profile = await request(app.getHttpServer())
        .get(`${BASE_URL}/profile`)
        .set('Authorization', `Bearer ${res.body.access_token}`);

      expect(profile.statusCode).toBe(200);
      expect(profile.body.email).toBe(EMAIL);
      expect(profile.body.id).toBe(1);
    });
  });
});
