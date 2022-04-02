import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Rastreamento } from '../../../shared/rastreamento';
import { Modulo } from './modulo.entity';
import { PerfilModuloPermissao } from './perfil-modulo-permissao.entity';
import { Perfil } from './perfil.entity';

@Entity()
export class PerfilModulo extends Rastreamento<PerfilModulo> {
  @ManyToOne(() => Perfil, (perfil) => perfil.modulos)
  perfil: Perfil;

  @ManyToOne(() => Modulo, (modulo) => modulo.perfis)
  modulo: Modulo;

  @OneToMany(
    () => PerfilModuloPermissao,
    (perfilModuloPermissao) => perfilModuloPermissao.perfilModulo,
  )
  permissoes: PerfilModuloPermissao[];
}
