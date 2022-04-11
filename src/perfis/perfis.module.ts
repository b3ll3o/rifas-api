import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { ModuloApplicationService } from './application/services/modulo-application.service';
import { PerfilApplicationService } from './application/services/perfil-application.service';
import { PermissaoApplicationService } from './application/services/permissao-application.service';
import { PerfisController } from './controller/perfis.controller';
import { Modulo } from './domain/entities/modulo.entity';
import { PerfilModuloPermissao } from './domain/entities/perfil-modulo-permissao.entity';
import { PerfilModulo } from './domain/entities/perfil-modulo.entity';
import { Perfil } from './domain/entities/perfil.entity';
import { Permissao } from './domain/entities/permissao.entity';
import { ModuloService } from './domain/services/modulo.service';
import { PerfilModuloPermissaoService } from './domain/services/perfil-modulo-permissao.service';
import { PerfilModuloService } from './domain/services/perfil-modulo.service';
import { PerfilService } from './domain/services/perfil.service';
import { PermissaoService } from './domain/services/permissao.service';

@Module({
  providers: [
    PerfilService,
    ModuloService,
    PermissaoService,
    PerfilModuloService,
    PerfilModuloPermissaoService,
    PerfilApplicationService,
    ModuloApplicationService,
    PermissaoApplicationService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Perfil,
      Modulo,
      Permissao,
      PerfilModulo,
      PerfilModuloPermissao,
    ]),
    SharedModule,
  ],
  controllers: [PerfisController],
})
export class PerfisModule {}
