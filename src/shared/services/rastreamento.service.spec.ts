import { Perfil } from "../../perfis/domain/entities/perfil.entity";
import { Connection, getConnection } from "typeorm";
import { RastreamentoService } from "./rastreamento.service";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "../../usuarios/domain/entities/usuario.entity";
import { UsuariosService } from "../../usuarios/domain/services/usuarios.service";
import { perfilFactory, usuarioFactory } from "../../perfis/tests/construtores-entidade";
import { UsuariosModule } from "../../usuarios/usuarios.module";

describe('RastreamentoService', () => {
  let service: RastreamentoService<Perfil>;
  let usuarioService: UsuariosService
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RastreamentoService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
        UsuariosModule
      ],
    }).compile();

    usuarioService = module.get<UsuariosService>(UsuariosService);
    service = module.get(RastreamentoService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('adicionaRastreioInclusao', () => {
    it('deve adicionar o rastreamento de inclusão', async () => {

      const usuario = await usuarioService.cadastraNovoUsuario(usuarioFactory({}))
      const perfil = perfilFactory({})
      const rastreio = await service.adicionaRastreioInclusao(usuario.id, perfil)
      expect(rastreio.criadoPor.id).toBe(usuario.id)
      expect(rastreio.criadoEm).not.toBeUndefined()
      expect(rastreio.criadoEm).not.toBeNull()
    })

    it('não deve adicionar o rastreamento de inclusão quando o usuario não existir', async () => {

      const perfil = perfilFactory({})
      await expect(service.adicionaRastreioInclusao(100, perfil)).rejects.toThrow()
    })
  })

})