import { Entidade } from "../../../shared/entidade";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Perfil extends Entidade<Perfil> {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;
}