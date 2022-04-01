import { Usuario } from "../usuarios/domain/entities/usuario.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entidade } from "./entidade";

export abstract class Rastreamento<T> extends Entidade<T> {

  @PrimaryGeneratedColumn()
  id:number

  @ManyToOne(() => Usuario)
  criadoPor: Usuario

  @ManyToOne(() => Usuario, {nullable: true})
  atualizadoPor?: Usuario

  @Column()
  criadoEm: Date

  @Column({nullable: true})
  atualizadoEm?: Date
}