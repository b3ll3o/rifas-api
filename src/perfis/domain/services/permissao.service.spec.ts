import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "../../../usuarios/domain/entities/usuario.entity";
import { Connection, getConnection } from "typeorm";
import { Modulo } from "../entities/modulo.entity";
import { Perfil } from "../entities/perfil.entity";
import { Permissao } from "../entities/permissao.entity";
import { PermissaoJaCadastradoErro } from "../erros";
import { PermissaoService } from "./permissao.service";
import { SharedModule } from "../../../shared/shared.module";
import { UsuariosService } from "../../../usuarios/domain/services/usuarios.service";

const NOME = 'nome';
const SENHA = 'senha';
const EMAIL = 'email@email.com'

const permissaoFactory = ({nome=NOME}): Perfil => new Perfil({
  nome
})

const usuarioFactory = ({email=EMAIL, senha=SENHA}): Usuario => new Usuario({
  email, senha
})

describe('PermissaoService', () => {
  let service: PermissaoService;
  let usuarioService: UsuariosService
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissaoService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario, Perfil, Modulo, Permissao],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario, Perfil, Modulo, Permissao]),
        SharedModule
      ],
    }).compile();

    service = module.get(PermissaoService);
    usuarioService = module.get(UsuariosService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastrar', () => {
    it('deve retorna um permissao com id', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}));
      const permissao = await service.cadastrar(usuario.id, permissaoFactory({}));
      expect(permissao.id).not.toBeUndefined();
      expect(permissao.id).not.toBeNull();
    })

    it('deve retorna um permissao com o mesmo nome passado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}));
      const permissao = await service.cadastrar(usuario.id, permissaoFactory({}));
      expect(permissao.nome).toBe(NOME)
    })

    it('deve retornar um erro se o permissao já estiver cadastrado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}));
      const permissao = await service.cadastrar(usuario.id, permissaoFactory({}));
      await expect(service.cadastrar(usuario.id, permissaoFactory({}))).rejects.toThrow(PermissaoJaCadastradoErro);
    })
  })
});