import { Column, Entity } from 'typeorm';
import { Rastreamento } from '../../../shared/rastreamento';

@Entity()
export class Permissao extends Rastreamento<Permissao> {
  @Column()
  nome: string;
}
