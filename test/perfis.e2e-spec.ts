import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidadorPipe } from '../pipes/validador.pipe';
import { Modulo } from '../src/perfis/domain/entities/modulo.entity';
import { PerfilModuloPermissao } from '../src/perfis/domain/entities/perfil-modulo-permissao.entity';
import { PerfilModulo } from '../src/perfis/domain/entities/perfil-modulo.entity';
import { Perfil } from '../src/perfis/domain/entities/perfil.entity';
import { Permissao } from '../src/perfis/domain/entities/permissao.entity';
import { PerfisModule } from '../src/perfis/perfis.module';
import { Usuario } from '../src/usuarios/domain/entities/usuario.entity';
import * as request from 'supertest';
import { UsuariosService } from '../src/usuarios/domain/services/usuarios.service';
import { usuarioFactory } from '../src/perfis/tests/construtores-entidade';
import { JwtAuthGuard } from '../src/auth/jwt/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { AuthModule } from '../src/auth/auth.module';

const BASE_URL_PERFIS = '/perfis';
const BASE_URL_MODULOS = '/modulos';
const BASE_URL_PERMISSOES = '/permissoes';
const BASE_URL_AUTH = '/auth';

describe('perfis', () => {
  let app: INestApplication;
  let usuariosService: UsuariosService;
  let jwt_token: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        PerfisModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [
            Usuario,
            Perfil,
            Modulo,
            Permissao,
            PerfilModulo,
            PerfilModuloPermissao,
          ],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([
          Usuario,
          Perfil,
          Modulo,
          Permissao,
          PerfilModulo,
          PerfilModuloPermissao,
        ]),
      ],
    }).compile();

    usuariosService = module.get(UsuariosService);

    app = module.createNestApplication();
    const reflector = app.get(Reflector);
    app.useGlobalPipes(new ValidadorPipe());
    app.useGlobalGuards(new JwtAuthGuard(reflector));
    await app.init();
  });

  describe('perfis', () => {
    describe('cadastrar', () => {
      it('não deve cadastrar um novo perfil', async () => {
        await usuariosService.cadastraNovoUsuario(usuarioFactory({}));

        const res = await request(app.getHttpServer())
          .post(`${BASE_URL_AUTH}/login`)
          .send(usuarioFactory({}));

        jwt_token = res.body.access_token;

        return request(app.getHttpServer())
          .post(BASE_URL_PERFIS)
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            nome: 'nome',
          })
          .expect(201);
      });

      it('deve cadastrar um novo perfil', () => {
        return request(app.getHttpServer())
          .post(BASE_URL_PERFIS)
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            nome: 'nome',
            usuarioId: 1,
          })
          .expect(400);
      });
    });
  });

  describe('modulos', () => {
    describe('cadastrar', () => {
      it('deve cadastrar um novo modulo', () => {
        return request(app.getHttpServer())
          .post(BASE_URL_MODULOS)
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            nome: 'nome',
          })
          .expect(201);
      });

      it('não deve cadastrar dois modulos com o mesmo nome', () => {
        return request(app.getHttpServer())
          .post(BASE_URL_MODULOS)
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            nome: 'nome',
          })
          .expect(400);
      });
    });
  });

  describe('permissoes', () => {
    describe('cadastrar', () => {
      it('deve cadastrar uma nova permissão', () => {
        return request(app.getHttpServer())
          .post(BASE_URL_PERMISSOES)
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            nome: 'nome',
          })
          .expect(201);
      });

      it('não deve cadastrar duas permissões com o mesmo nome', () => {
        return request(app.getHttpServer())
          .post(BASE_URL_PERMISSOES)
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            nome: 'nome',
          })
          .expect(400);
      });
    });
  });
});
