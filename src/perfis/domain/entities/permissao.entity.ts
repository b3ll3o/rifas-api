import { Entidade } from "src/shared/entidade";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permissao extends Entidade<Permissao> {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}