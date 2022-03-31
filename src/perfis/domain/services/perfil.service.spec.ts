import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection, getConnection } from "typeorm";
import { Modulo } from "../entities/modulo.entity";
import { Perfil } from "../entities/perfil.entity";
import { Permissao } from "../entities/permissao.entity";
import { PerfilJaCadastradoErro } from "../erros";
import { PerfilService } from "./perfil.service";

const NOME = 'nome';

const perfilFactory = ({nome=NOME}): Perfil => new Perfil({
  nome
})

describe('PerfilService', () => {
  let service: PerfilService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilService],
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

    service = module.get(PerfilService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastrar', () => {
    it('deve retorna um perfil com id', async () => {
      const perfil = await service.cadastrar(perfilFactory({}));
      expect(perfil.id).not.toBeUndefined();
      expect(perfil.id).not.toBeNull();
    })

    it('deve retorna um perfil com o mesmo nome passado', async () => {
      const perfil = await service.cadastrar(perfilFactory({}));
      expect(perfil.nome).toBe(NOME)
    })

    it('deve retornar um erro se o perfil já estiver cadastrado', async () => {
      await service.cadastrar(perfilFactory({}));
      await expect(service.cadastrar(perfilFactory({}))).rejects.toThrow(PerfilJaCadastradoErro);
    })
  })
});