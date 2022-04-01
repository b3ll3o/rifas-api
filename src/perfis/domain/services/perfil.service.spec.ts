import { TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../../../usuarios/domain/services/usuarios.service';
import { Connection, getConnection } from 'typeorm';
import { Perfil } from '../entities/perfil.entity';
import { PerfilJaCadastradoErro } from '../erros';
import { PerfilService } from './perfil.service';
import { Usuario } from '../../../usuarios/domain/entities/usuario.entity';
import moduleFactory from '../../../perfis/tests/module-test.factory';

const NOME = 'nome';
const SENHA = 'senha';
const EMAIL = 'email@email.com';

const perfilFactory = ({ nome = NOME }): Perfil =>
  new Perfil({
    nome,
  });

const usuarioFactory = ({ email = EMAIL, senha = SENHA }): Usuario =>
  new Usuario({
    email,
    senha,
  });

describe('PerfilService', () => {
  let service: PerfilService;
  let usuarioService: UsuariosService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await moduleFactory();

    service = module.get(PerfilService);
    usuarioService = module.get(UsuariosService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastrar', () => {
    it('deve retorna um perfil com id', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const perfil = await service.cadastrar(usuario.id, perfilFactory({}));
      expect(perfil.id).not.toBeUndefined();
      expect(perfil.id).not.toBeNull();
    });

    it('deve retorna um perfil com o mesmo nome passado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const perfil = await service.cadastrar(usuario.id, perfilFactory({}));
      expect(perfil.nome).toBe(NOME);
    });

    it('deve retornar um erro se o perfil já estiver cadastrado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      await service.cadastrar(usuario.id, perfilFactory({}));
      await expect(
        service.cadastrar(usuario.id, perfilFactory({})),
      ).rejects.toThrow(PerfilJaCadastradoErro);
    });
  });
});
