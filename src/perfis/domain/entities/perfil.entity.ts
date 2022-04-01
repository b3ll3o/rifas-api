import { Column, Entity } from 'typeorm';
import { Rastreamento } from '../../../shared/rastreamento';

@Entity()
export class Perfil extends Rastreamento<Perfil> {
  @Column()
  nome: string;
}
