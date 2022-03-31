import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Modulo } from "../entities/modulo.entity";
import { ModuloJaCadastradoErro } from "../erros";

@Injectable()
export class ModuloService {
  constructor(
    @InjectRepository(Modulo)
    private moduloRepository: Repository<Modulo>,
  ) {}

  async cadastrar(modulo: Modulo): Promise<Modulo> {
    const perfilEncontrado = await this.moduloJaCadastrado(modulo.nome);
    if(perfilEncontrado) {
      throw new ModuloJaCadastradoErro();
    }
    return this.moduloRepository.save(modulo);
  }

  async moduloJaCadastrado(nome: string): Promise<Modulo | undefined> {
    return this.moduloRepository.findOne({where: {nome}});
  }
}