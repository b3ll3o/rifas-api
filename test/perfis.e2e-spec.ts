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
import { EMAIL, usuarioFactory } from '../src/perfis/tests/construtores-entidade';

const BASE_URL_PERFIS = '/perfis';
const BASE_URL_MODULOS = '/modulos';
const BASE_URL_PERMISSOES = '/permissoes';

describe('perfis', () => {
  let app: INestApplication;
  let usuariosService: UsuariosService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
    app.useGlobalPipes(new ValidadorPipe());
    await app.init();
  });

  describe('perfis', () => {
    describe('cadastrar', () => {

      it('não deve cadastrar um novo perfil', () => {

        return request(app.getHttpServer())
          .post(BASE_URL_PERFIS)
          .send({
            nome: 'nome',
            usuarioId: 100,
          })
          .expect(404)
      });

      it('deve cadastrar um novo perfil', async () => {

        const usuario = await usuariosService.cadastraNovoUsuario(
          usuarioFactory({})
        );

        return request(app.getHttpServer())
          .post(BASE_URL_PERFIS)
          .send({
            nome: 'nome',
            usuarioId: usuario.id,
          })
          .expect(201)
      });

      it('não deve cadastrar dois perfis com o mesmo nome', () => {

        return request(app.getHttpServer())
          .post(BASE_URL_PERFIS)
          .send({
            nome: 'nome',
            usuarioId: 1,
          })
          .expect(400)
      });
    });
  });

  describe('modulos', () => {

    describe('cadastrar', () => {
      it('não deve cadastrar um novo modulo', () => {

        return request(app.getHttpServer())
          .post(BASE_URL_MODULOS)
          .send({
            nome: 'nome',
            usuarioId: 100,
          })
          .expect(404)
      });

      it('deve cadastrar um novo modulo', () => {

        return request(app.getHttpServer())
          .post(BASE_URL_MODULOS)
          .send({
            nome: 'nome',
            usuarioId: 1,
          })
          .expect(201)
      });

      it('não deve cadastrar dois modulos com o mesmo nome', () => {

        return request(app.getHttpServer())
          .post(BASE_URL_MODULOS)
          .send({
            nome: 'nome',
            usuarioId: 1,
          })
          .expect(400)
      });
    })
  })

  describe('permissoes', () => {
    describe('cadastrar', () => {

      it('não deve cadastrar uma nova permissão', () => {

        return request(app.getHttpServer())
          .post(BASE_URL_PERMISSOES)
          .send({
            nome: 'nome',
            usuarioId: 100,
          })
          .expect(404)
      });

      it('deve cadastrar um novo perfil', () => {

        return request(app.getHttpServer())
          .post(BASE_URL_PERMISSOES)
          .send({
            nome: 'nome',
            usuarioId:1,
          })
          .expect(201)
      });

      it('não deve cadastrar dois perfis com o mesmo nome', async () => {

        return request(app.getHttpServer())
          .post(BASE_URL_PERMISSOES)
          .send({
            nome: 'nome',
            usuarioId: 1,
          })
          .expect(400)
      });
    });
  });
});
