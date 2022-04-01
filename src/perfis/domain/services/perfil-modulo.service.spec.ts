import { TestingModule } from '@nestjs/testing';
import { Connection, getConnection } from 'typeorm';
import moduleFactory from '../../tests/module-test.factory';
import {
  ModuloNaoEncontradoErro,
  PerfilModuloJaCadastradoErro,
  PerfilNaoEncontradoErro,
} from '../erros';
import { PerfilModuloService } from './perfil-modulo.service';
import { PerfilService } from './perfil.service';
import { ModuloService } from './modulo.service';
import { Perfil } from '../entities/perfil.entity';
import { Usuario } from '../../../usuarios/domain/entities/usuario.entity';
import { UsuariosService } from '../../../usuarios/domain/services/usuarios.service';
import { Modulo } from '../entities/modulo.entity';
import { UsuarioNaoEncontrado } from '../../../usuarios/domain/erros';

const NOME = 'nome';
const SENHA = 'senha';
const EMAIL = 'email@email.com';

const perfilFactory = ({ nome = NOME }): Perfil =>
  new Perfil({
    nome,
  });

const moduloFactory = ({ nome = NOME }): Modulo =>
  new Modulo({
    nome,
  });

const usuarioFactory = ({ email = EMAIL, senha = SENHA }): Usuario =>
  new Usuario({
    email,
    senha,
  });

describe('PerfilModuloService', () => {
  let service: PerfilModuloService;
  let connection: Connection;
  let perfilService: PerfilService;
  let moduloService: ModuloService;
  let usuarioService: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await moduleFactory();

    service = module.get(PerfilModuloService);
    perfilService = module.get(PerfilService);
    moduloService = module.get(ModuloService);
    usuarioService = module.get(UsuariosService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('adicionaPerfilModulo', () => {
    it('deve jogar um erro caso perfil não exista', async () => {
      await expect(service.adicionaPerfilModulo(1, 1, 1)).rejects.toThrowError(
        PerfilNaoEncontradoErro,
      );
    });

    it('deve jogar um erro caso modulo não exista', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const perfil = await perfilService.cadastrar(
        usuario.id,
        perfilFactory({}),
      );
      await expect(
        service.adicionaPerfilModulo(usuario.id, perfil.id, 1),
      ).rejects.toThrowError(ModuloNaoEncontradoErro);
    });

    it('deve adicionar um novo modulo ao perfil', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const perfil = await perfilService.cadastrar(
        usuario.id,
        perfilFactory({}),
      );
      const modulo = await moduloService.cadastrar(
        usuario.id,
        moduloFactory({}),
      );
      const perfilModulo = await service.adicionaPerfilModulo(
        usuario.id,
        perfil.id,
        modulo.id,
      );
      expect(perfilModulo.id).not.toBeUndefined();
      expect(perfilModulo.id).not.toBeNull();
      expect(perfilModulo.criadoPor.id).toBe(usuario.id);
      expect(perfilModulo.modulo.id).toBe(modulo.id);
      expect(perfilModulo.perfil.id).toBe(perfil.id);
    });

    it('deve jogar um erro ao tentar adicionar um modulo ao perfil duas vezes', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const perfil = await perfilService.cadastrar(
        usuario.id,
        perfilFactory({}),
      );
      const modulo = await moduloService.cadastrar(
        usuario.id,
        moduloFactory({}),
      );
      await service.adicionaPerfilModulo(usuario.id, perfil.id, modulo.id);
      await expect(
        service.adicionaPerfilModulo(usuario.id, perfil.id, modulo.id),
      ).rejects.toThrowError(PerfilModuloJaCadastradoErro);
    });

    it('deve jogar um erro ao tentar adicionar um modulo ao perfil duas vezes', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(
        usuarioFactory({}),
      );
      const perfil = await perfilService.cadastrar(
        usuario.id,
        perfilFactory({}),
      );
      const modulo = await moduloService.cadastrar(
        usuario.id,
        moduloFactory({}),
      );
      await expect(
        service.adicionaPerfilModulo(100, perfil.id, modulo.id),
      ).rejects.toThrowError(UsuarioNaoEncontrado);
    });
  });
});
