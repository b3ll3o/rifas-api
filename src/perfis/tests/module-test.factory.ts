import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { Usuario } from '../../usuarios/domain/entities/usuario.entity';
import { Modulo } from '../domain/entities/modulo.entity';
import { PerfilModuloPermissao } from '../domain/entities/perfil-modulo-permissao.entity';
import { PerfilModulo } from '../domain/entities/perfil-modulo.entity';
import { Perfil } from '../domain/entities/perfil.entity';
import { Permissao } from '../domain/entities/permissao.entity';
import { ModuloService } from '../domain/services/modulo.service';
import { PerfilModuloPermissaoService } from '../domain/services/perfil-modulo-permissao.service';
import { PerfilModuloService } from '../domain/services/perfil-modulo.service';
import { PerfilService } from '../domain/services/perfil.service';
import { PermissaoService } from '../domain/services/permissao.service';

export default async function moduleFactory(): Promise<TestingModule> {
  return Test.createTestingModule({
    providers: [
      PerfilService,
      ModuloService,
      PermissaoService,
      PerfilModuloService,
      PerfilModuloPermissaoService
    ],
    imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [Usuario, Perfil, Modulo, Permissao, PerfilModulo, PerfilModuloPermissao, PerfilModuloPermissao],
        synchronize: true,
        dropSchema: true,
      }),
      TypeOrmModule.forFeature([
        Usuario,
        Perfil,
        Modulo,
        Permissao,
        PerfilModulo,PerfilModuloPermissao, PerfilModuloPermissao
      ]),
      SharedModule,
    ],
  }).compile();
}
