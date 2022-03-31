import { Entidade } from '../../../shared/entidade';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario extends Entidade<Usuario> {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  senha: string;
}
