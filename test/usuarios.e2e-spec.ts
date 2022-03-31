import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../src/usuarios/domain/entities/usuario.entity';
import { UsuariosModule } from '../src/usuarios/usuarios.module';
import * as request from 'supertest';
import { ValidadorPipe } from '../pipes/validador.pipe';

const BASE_URL = '/usuarios';

const EMAIL = 'email@email.com';
const SENHA = 'senha';

const usuarioFactory = ({ email = EMAIL, senha = SENHA }): Usuario =>
  new Usuario({
    email,
    senha,
  });

describe('usuarios', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsuariosModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidadorPipe());
    await app.init();
  });

  describe('cadastraNovoUsuario', () => {
    it('deve cadastrar um novo usuario', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(usuarioFactory({}))
        .expect(201)
        .expect({
          id: 1,
          email: EMAIL,
        });
    });

    it('não deve cadastrar dois usuarios com o mesmo email', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(usuarioFactory({}))
        .expect(400);
    });

    it('não deve cadastrar um usuario sem email', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(usuarioFactory({ email: '' }))
        .expect(400);
    });

    it('não deve cadastrar um usuario sem senha', () => {
      return request(app.getHttpServer())
        .post(BASE_URL)
        .send(usuarioFactory({ senha: '' }))
        .expect(400);
    });
  });

  describe('cadastraNovoUsuario', () => {
    it('deve retorna um usuario cadastrado', () => {
      return request(app.getHttpServer())
        .get(`${BASE_URL}/1`)
        .expect(200)
        .expect({
          id: 1,
          email: EMAIL,
        });
    });

    it('deve retorna um erro caso usuario não esteja cadastrado', () => {
      return request(app.getHttpServer()).get(`${BASE_URL}/2`).expect(404);
    });
  });
});
