import { TestingModule } from '@nestjs/testing';
import { Usuario } from '../../../usuarios/domain/entities/usuario.entity';
import { Connection, getConnection } from 'typeorm';
import { Perfil } from '../entities/perfil.entity';
import { PermissaoJaCadastradoErro } from '../erros';
import { PermissaoService } from './permissao.service';
import { UsuariosService } from '../../../usuarios/domain/services/usuarios.service';
import moduleFactory from '../../../perfis/tests/module-test.factory';

const NOME = 'nome';
const SENHA = 'senha';
const EMAIL = 'email@email.com';

const permissaoFactory = ({ nome = NOME }): Perfil =>
  new Perfil({
    nome,
  });

const usuarioFactory = ({ email = EMAIL, senha = SENHA }): Usuario =>
  new Usuario({
    email,
    senha,
  });

describe('PermissaoService', () => {
  let service: PermissaoService;
  let usuarioService: UsuariosService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await moduleFactory();

    service = module.get(PermissaoService);
    usuarioService = module.get(UsuariosService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastrar', () => {
    it('deve retorna um permissao com id', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const permissao = await service.cadastrar(
        usuario.id,
        permissaoFactory({}),
      );
      expect(permissao.id).not.toBeUndefined();
      expect(permissao.id).not.toBeNull();
    });

    it('deve retorna um permissao com o mesmo nome passado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const permissao = await service.cadastrar(
        usuario.id,
        permissaoFactory({}),
      );
      expect(permissao.nome).toBe(NOME);
    });

    it('deve retornar um erro se o permissao já estiver cadastrado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      await service.cadastrar(usuario.id, permissaoFactory({}));
      await expect(
        service.cadastrar(usuario.id, permissaoFactory({})),
      ).rejects.toThrow(PermissaoJaCadastradoErro);
    });
  });
});
