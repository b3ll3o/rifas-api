import { TestingModule } from '@nestjs/testing';
import { Usuario } from '../../../usuarios/domain/entities/usuario.entity';
import { Connection, getConnection } from 'typeorm';
import { Modulo } from '../entities/modulo.entity';
import {
  ModuloJaCadastradoErro,
  ModuloNaoEncontradoErro,
  PermissaoNaoEncontradoErro,
} from '../erros';
import { ModuloService } from './modulo.service';
import { UsuariosService } from '../../../usuarios/domain/services/usuarios.service';
import moduleFactory from '../../../perfis/tests/module-test.factory';
import { PermissaoService } from './permissao.service';
import { Permissao } from '../entities/permissao.entity';

const NOME = 'nome';
const SENHA = 'senha';
const EMAIL = 'email@email.com';

const moduloFactory = ({ nome = NOME }): Modulo =>
  new Modulo({
    nome,
  });

const usuarioFactory = ({ email = EMAIL, senha = SENHA }): Usuario =>
  new Usuario({
    email,
    senha,
  });

const permissaoFactory = ({ nome = NOME }): Permissao =>
  new Permissao({
    nome,
  });

describe('ModuloService', () => {
  let service: ModuloService;
  let usuarioService: UsuariosService;
  let permissaoService: PermissaoService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await moduleFactory();

    service = module.get(ModuloService);
    usuarioService = module.get(UsuariosService);
    permissaoService = module.get(PermissaoService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastrar', () => {
    it('deve retorna um modulo com id', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const modulo = await service.cadastrar(usuario.id, moduloFactory({}));
      expect(modulo.id).not.toBeUndefined();
      expect(modulo.id).not.toBeNull();
    });

    it('deve retorna um modulo com o mesmo nome passado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const modulo = await service.cadastrar(usuario.id, moduloFactory({}));
      expect(modulo.nome).toBe(NOME);
    });

    it('deve retornar um erro se o modulo já estiver cadastrado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      await service.cadastrar(usuario.id, moduloFactory({}));
      await expect(
        service.cadastrar(usuario.id, moduloFactory({})),
      ).rejects.toThrow(ModuloJaCadastradoErro);
    });
  });

  describe('adicionaPermissaoModulo', () => {
    it('deve adicionar uma permissao ao modulo', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const modulo = await service.cadastrar(usuario.id, moduloFactory({}));
      const permissao = await permissaoService.cadastrar(
        usuario.id,
        permissaoFactory({}),
      );
      const permissaoModulo = await service.adicionaPermissaoModulo(
        modulo.id,
        permissao.id,
      );
      expect(permissaoModulo.permissoes).toHaveLength(1);
      expect(permissaoModulo.permissoes).not.toBeNull();
      expect(permissaoModulo.permissoes).not.toBeUndefined();
    });

    it('deve jogar um erro caso modulo não existir', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );

      const permissao = await permissaoService.cadastrar(
        usuario.id,
        permissaoFactory({}),
      );
      await expect(
        service.adicionaPermissaoModulo(100, permissao.id),
      ).rejects.toThrow(ModuloNaoEncontradoErro);
    });

    it('deve jogar um erro caso perfil não existir', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const modulo = await service.cadastrar(usuario.id, moduloFactory({}));
      await expect(
        service.adicionaPermissaoModulo(modulo.id, 100),
      ).rejects.toThrow(PermissaoNaoEncontradoErro);
    });
  });
});
