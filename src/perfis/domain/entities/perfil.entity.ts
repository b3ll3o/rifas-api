import { Column, Entity, OneToMany } from 'typeorm';
import { Rastreamento } from '../../../shared/rastreamento';
import { PerfilModulo } from './perfil-modulo.entity';

@Entity()
export class Perfil extends Rastreamento<Perfil> {
  @Column()
  nome: string;

  @OneToMany(() => PerfilModulo, modulo => modulo.perfil)
  modulos: PerfilModulo[];
}
