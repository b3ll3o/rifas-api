import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Perfil } from "../entities/perfil.entity";
import { PerfilJaCadastradoErro } from "../erros";

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil)
    private perfilRepository: Repository<Perfil>,
  ) {}

  async cadastrar(perfil: Perfil): Promise<Perfil> {
    const perfilEncontrado = await this.perfilJaCadastrado(perfil.nome);
    if(perfilEncontrado) {
      throw new PerfilJaCadastradoErro();
    }
    return this.perfilRepository.save(perfil);
  }

  async perfilJaCadastrado(nome: string): Promise<Perfil | undefined> {
    return this.perfilRepository.findOne({where: {nome}});
  }
}