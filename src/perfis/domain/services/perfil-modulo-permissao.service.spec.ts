import { UsuariosService } from "../../../usuarios/domain/services/usuarios.service";
import { Connection, getConnection } from "typeorm";
import { ModuloService } from "./modulo.service";
import { PerfilModuloService } from "./perfil-modulo.service";
import { PerfilService } from "./perfil.service";
import { TestingModule } from "@nestjs/testing";
import moduleFactory from "../../tests/module-test.factory";
import { moduloFactory, perfilFactory, permissaoFactory, usuarioFactory } from "../../tests/construtores-entidade";
import { PerfilModuloPermissaoService } from "./perfil-modulo-permissao.service";
import { PermissaoService } from "./permissao.service";
import { PerfilModuloNaoEncontradoErro, PerfilModuloPermissaoJaCadastradoErro, PermissaoNaoEncontradoErro } from "../erros";

describe('PerfilModuloPermissaoService', () => {

  let service: PerfilModuloPermissaoService;
  let perfilModuloService: PerfilModuloService;
  let connection: Connection;
  let perfilService: PerfilService;
  let moduloService: ModuloService;
  let usuarioService: UsuariosService;
  let permissaoService: PermissaoService;

  beforeEach(async () => {
    const module: TestingModule = await moduleFactory();

    service = module.get(PerfilModuloPermissaoService)
    perfilModuloService = module.get(PerfilModuloService);
    perfilService = module.get(PerfilService);
    moduloService = module.get(ModuloService);
    usuarioService = module.get(UsuariosService);
    permissaoService = module.get(PermissaoService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  
  describe('cadastrar', () => {

    it('deve jogar um erro caso perfil modulo não exista', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}))
      const perfil = await perfilService.cadastrar(usuario.id, perfilFactory({}))
      const modulo = await moduloService.cadastrar(usuario.id, moduloFactory({}))
      const permissao = await permissaoService.cadastrar(usuario.id, permissaoFactory({}))
      await expect(service.cadastrar(usuario.id, 100, permissao.id)).rejects.toThrowError(PerfilModuloNaoEncontradoErro)
    })

    it('deve jogar um erro caso permissão não exista', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}))
      const perfil = await perfilService.cadastrar(usuario.id, perfilFactory({}))
      const modulo = await moduloService.cadastrar(usuario.id, moduloFactory({}))
      const perfilModulo = await perfilModuloService.adicionaPerfilModulo(usuario.id, perfil.id, modulo.id)
      await expect(service.cadastrar(usuario.id, perfilModulo.id, 100)).rejects.toThrowError(PermissaoNaoEncontradoErro)
    })

    it('deve retorna um perfil modulo permissao', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}))
      const perfil = await perfilService.cadastrar(usuario.id, perfilFactory({}))
      const modulo = await moduloService.cadastrar(usuario.id, moduloFactory({}))
      const perfilModulo = await perfilModuloService.adicionaPerfilModulo(usuario.id, perfil.id, modulo.id)
      const permissao = await permissaoService.cadastrar(usuario.id, permissaoFactory({}))
      const perfilModuloPermissao = await service.cadastrar(usuario.id, perfilModulo.id, permissao.id);
      expect(perfilModuloPermissao).not.toBeNull()
      expect(perfilModuloPermissao).not.toBeUndefined()
      expect(perfilModuloPermissao.id).not.toBeNull()
      expect(perfilModuloPermissao.id).not.toBeUndefined()
      expect(perfilModuloPermissao.criadoPor.id).toBe(usuario.id)
    })

    it('deve jogar um erro quando tentar adicionar uma permissão ao perfil modulo mais de uma vez', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}))
      const perfil = await perfilService.cadastrar(usuario.id, perfilFactory({}))
      const modulo = await moduloService.cadastrar(usuario.id, moduloFactory({}))
      const perfilModulo = await perfilModuloService.adicionaPerfilModulo(usuario.id, perfil.id, modulo.id)
      const permissao = await permissaoService.cadastrar(usuario.id, permissaoFactory({}))
      await service.cadastrar(usuario.id, perfilModulo.id, permissao.id);
      await expect(service.cadastrar(usuario.id, perfilModulo.id, permissao.id)).rejects.toThrowError(PerfilModuloPermissaoJaCadastradoErro)
    })
  })
})