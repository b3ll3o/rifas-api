import { Entity, ManyToOne } from 'typeorm';
import { Rastreamento } from '../../../shared/rastreamento';
import { PerfilModulo } from './perfil-modulo.entity';
import { Permissao } from './permissao.entity';

@Entity()
export class PerfilModuloPermissao extends Rastreamento<PerfilModuloPermissao> {
  @ManyToOne(() => PerfilModulo, (perfilModulo) => perfilModulo.permissoes)
  perfilModulo: PerfilModulo;

  @ManyToOne(() => Permissao, (permissao) => permissao.perfilModulos)
  permissao: Permissao;
}