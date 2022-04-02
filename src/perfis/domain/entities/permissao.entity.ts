import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Rastreamento } from '../../../shared/rastreamento';
import { Modulo } from './modulo.entity';
import { PerfilModuloPermissao } from './perfil-modulo-permissao.entity';

@Entity()
export class Permissao extends Rastreamento<Permissao> {
  @Column()
  nome: string;

  @ManyToOne(() => Modulo, (modulo) => modulo.permissoes)
  modulo: Modulo;

  @OneToMany(() => PerfilModuloPermissao, (perfilModuloPermissao) => perfilModuloPermissao.perfilModulo)
  perfilModulos: PerfilModuloPermissao[];

  valido(): boolean {
    return this.id !== undefined && this.id !== null && this.id !== 0;
  }
}
