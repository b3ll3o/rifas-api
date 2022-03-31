import { Injectable } from "@nestjs/common";
import { Perfil } from "../entities/perfil.entity";

@Injectable()
export class PerfilService {
  constructor() {}

  async cadastrar(perfil: Perfil) {
    return perfil;
  }
}