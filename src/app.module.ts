import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PerfisModule } from './perfis/perfis.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { ValidadorPipe } from '../pipes/validador.pipe';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UsuariosModule, AuthModule, PerfisModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
    synchronize: true,
    autoLoadEntities: true,
  }),SharedModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },{
    provide: APP_PIPE,
    useClass: ValidadorPipe,
  }]
  
})
export class AppModule {}
