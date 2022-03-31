import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosApplicationservice } from './application/services/usuarios-application.service';
import { UsuariosController } from './controller/usuarios.controller';
import { Usuario } from './domain/entities/usuario.entity';
import { UsuariosService } from './domain/services/usuarios.service';

@Module({
  providers: [UsuariosService, UsuariosApplicationservice],
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  exports: [UsuariosService],
})
export class UsuariosModule {}
