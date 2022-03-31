import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection, getConnection } from "typeorm";
import { Modulo } from "../entities/modulo.entity";
import { Perfil } from "../entities/perfil.entity";
import { Permissao } from "../entities/permissao.entity";
import { ModuloJaCadastradoErro } from "../erros";
import { ModuloService } from "./modulo.service";

const NOME = 'nome';

const moduloFactory = ({nome=NOME}): Modulo => new Modulo({
  nome
})

describe('ModuloService', () => {
  let service: ModuloService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModuloService],
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

    service = module.get(ModuloService);
    connection = getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  describe('cadastrar', () => {
    it('deve retorna um modulo com id', async () => {
      const modulo = await service.cadastrar(moduloFactory({}));
      expect(modulo.id).not.toBeUndefined();
      expect(modulo.id).not.toBeNull();
    })

    it('deve retorna um modulo com o mesmo nome passado', async () => {
      const modulo = await service.cadastrar(moduloFactory({}));
      expect(modulo.nome).toBe(NOME)
    })

    it('deve retornar um erro se o modulo já estiver cadastrado', async () => {
      await service.cadastrar(moduloFactory({}));
      await expect(service.cadastrar(moduloFactory({}))).rejects.toThrow(ModuloJaCadastradoErro);
    })
  })
});