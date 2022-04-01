import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "../../../usuarios/domain/entities/usuario.entity";
import { Connection, getConnection } from "typeorm";
import { Modulo } from "../entities/modulo.entity";
import { Perfil } from "../entities/perfil.entity";
import { Permissao } from "../entities/permissao.entity";
import { ModuloJaCadastradoErro } from "../erros";
import { ModuloService } from "./modulo.service";
import { UsuariosService } from "../../../usuarios/domain/services/usuarios.service";
import { SharedModule } from "../../../shared/shared.module";

const NOME = 'nome';
const SENHA = 'senha';
const EMAIL = 'email@email.com'

const moduloFactory = ({nome=NOME}): Modulo => new Modulo({
  nome
})

const usuarioFactory = ({email=EMAIL, senha=SENHA}): Usuario => new Usuario({
  email, senha
})

describe('ModuloService', () => {
  let service: ModuloService;
  let usuarioService: UsuariosService
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuloService],
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

    service = module.get(ModuloService);
    usuarioService = module.get(UsuariosService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastrar', () => {
    it('deve retorna um modulo com id', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}));
      const modulo = await service.cadastrar(usuario.id, moduloFactory({}));
      expect(modulo.id).not.toBeUndefined();
      expect(modulo.id).not.toBeNull();
    })

    it('deve retorna um modulo com o mesmo nome passado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}));
      const modulo = await service.cadastrar(usuario.id, moduloFactory({}));
      expect(modulo.nome).toBe(NOME)
    })

    it('deve retornar um erro se o modulo já estiver cadastrado', async () => {
      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}));
      await service.cadastrar(usuario.id, moduloFactory({}));
      await expect(service.cadastrar(usuario.id, moduloFactory({}))).rejects.toThrow(ModuloJaCadastradoErro);
    })
  })
});