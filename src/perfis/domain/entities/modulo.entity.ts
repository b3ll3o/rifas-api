import { Entidade } from "src/shared/entidade";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Modulo extends Entidade<Modulo> {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}