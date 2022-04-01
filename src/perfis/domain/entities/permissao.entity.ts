import { Column, Entity, ManyToOne } from 'typeorm';
import { Rastreamento } from '../../../shared/rastreamento';
import { Modulo } from './modulo.entity';

@Entity()
export class Permissao extends Rastreamento<Permissao> {
  @Column()
  nome: string;

  @ManyToOne(() => Modulo, (modulo) => modulo.permissoes)
  modulo: Modulo

  valido(): boolean {
    return this.id !== undefined && this.id !== null && this.id !== 0
  }
}
