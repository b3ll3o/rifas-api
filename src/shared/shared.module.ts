import { Module } from '@nestjs/common';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RastreamentoService } from './services/rastreamento.service';

@Module({
  providers: [RastreamentoService],
  imports: [UsuariosModule],
  exports: [RastreamentoService],
})
export class SharedModule {}
