import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { DataService } from './services/data.service';
import { RastreamentoService } from './services/rastreamento.service';

@Module({
  providers: [RastreamentoService, DataService],
  imports: [UsuariosModule],
  exports: [RastreamentoService, DataService],
})
export class SharedModule {}
