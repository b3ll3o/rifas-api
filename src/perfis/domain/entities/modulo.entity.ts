import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Rastreamento } from "../../../shared/rastreamento";

@Entity()
export class Modulo extends Rastreamento<Modulo> {

  @Column()
  nome: string;
}