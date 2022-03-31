import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuariosService } from './usuarios.service';
import { Connection, getConnection } from 'typeorm';
import { UsuarioJaCadastradoErro, UsuarioNaoEncontrado } from '../erros';

const EMAIL = 'email@email.com';
const SENHA = 'senha';

const usuarioFactory = (): Usuario =>
  new Usuario({
    email: EMAIL,
    senha: SENHA,
  });

describe('UsuariosService', () => {
  let service: UsuariosService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
      ],
    }).compile();

    service = module.get(UsuariosService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastraNovoUsuario', () => {
    it('deve retorna um usuario com id', async () => {
      const usuario = await service.cadastraNovoUsuario(usuarioFactory());
      expect(usuario.id).not.toBeUndefined();
      expect(usuario.id).not.toBeNull();
    });

    it('deve retorna um usuario cadastrado com o mesmo email passado', async () => {
      const usuario = await service.cadastraNovoUsuario(usuarioFactory());
      expect(usuario.email).toBe(EMAIL);
    });

    it('deve retorna um usuario csem senha', async () => {
      const usuario = await service.cadastraNovoUsuario(usuarioFactory());
      expect(usuario.senha).toBeUndefined();
    });

    it('não deve ser possivel cadastrar dois usuarios com o mesmo email', async () => {
      await service.cadastraNovoUsuario(usuarioFactory());
      await expect(
        service.cadastraNovoUsuario(usuarioFactory()),
      ).rejects.toThrow(UsuarioJaCadastradoErro);
    });
  });

  describe('buscaUsuarioPorId', () => {
    it('deve retorna um usuario com id', async () => {
      const usuario = await service.cadastraNovoUsuario(usuarioFactory());
      const usuarioEncontrado = await service.buscaUsuarioPorId(usuario.id);
      expect(usuarioEncontrado.id).toBe(usuario.id);
      expect(usuarioEncontrado.email).toBe(usuario.email);
    });

    it('não deve retorna a senha do usuario', async () => {
      const usuario = await service.cadastraNovoUsuario(usuarioFactory());
      const usuarioEncontrado = await service.buscaUsuarioPorId(usuario.id);
      expect(usuarioEncontrado.senha).toBeUndefined();
    });

    it('deve jogar um erro caso usuario não esteja cadastrado', async () => {
      await expect(service.buscaUsuarioPorId(1)).rejects.toThrow(
        UsuarioNaoEncontrado,
      );
    });
  });
});
