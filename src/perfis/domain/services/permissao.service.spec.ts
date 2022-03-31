import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection, getConnection } from "typeorm";
import { Modulo } from "../entities/modulo.entity";
import { Perfil } from "../entities/perfil.entity";
import { Permissao } from "../entities/permissao.entity";
import { PermissaoJaCadastradoErro } from "../erros";
import { PermissaoService } from "./permissao.service";

const NOME = 'nome';

const permissaoFactory = ({nome=NOME}): Perfil => new Perfil({
  nome
})

describe('PermissaoService', () => {
  let service: PermissaoService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissaoService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Perfil, Modulo, Permissao],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Perfil, Modulo, Permissao]),
      ],
    }).compile();

    service = module.get(PermissaoService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastrar', () => {
    it('deve retorna um permissao com id', async () => {
      const permissao = await service.cadastrar(permissaoFactory({}));
      expect(permissao.id).not.toBeUndefined();
      expect(permissao.id).not.toBeNull();
    })

    it('deve retorna um permissao com o mesmo nome passado', async () => {
      const permissao = await service.cadastrar(permissaoFactory({}));
      expect(permissao.nome).toBe(NOME)
    })

    it('deve retornar um erro se o permissao já estiver cadastrado', async () => {
      await service.cadastrar(permissaoFactory({}));
      await expect(service.cadastrar(permissaoFactory({}))).rejects.toThrow(PermissaoJaCadastradoErro);
    })
  })
});