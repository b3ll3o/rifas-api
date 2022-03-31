import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PerfisModule } from './perfis/perfis.module';

@Module({
  imports: [UsuariosModule, PerfisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
