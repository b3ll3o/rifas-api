import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Modulo } from './domain/entities/modulo.entity';
import { Perfil } from './domain/entities/perfil.entity';
import { Permissao } from './domain/entities/permissao.entity';
import { ModuloService } from './domain/services/modulo.service';
import { PerfilService } from './domain/services/perfil.service';
import { PermissaoService } from './domain/services/permissao.service';

@Module({
  providers: [PerfilService, ModuloService, PermissaoService],
  imports: [
    TypeOrmModule.forFeature([Perfil, Modulo, Permissao]),
    SharedModule,
  ],
})
export class PerfisModule {}
