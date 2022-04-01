import { Column, Entity, OneToMany } from 'typeorm';
import { Rastreamento } from '../../../shared/rastreamento';
import { PerfilModulo } from './perfil-modulo.entity';

@Entity()
export class Modulo extends Rastreamento<Modulo> {
  @Column()
  nome: string;

  @OneToMany(() => PerfilModulo, (perfil) => perfil.modulo)
  perfis: PerfilModulo[];
}
