import { Injectable } from "@nestjs/common";
import { Modulo } from "../entities/modulo.entity";

@Injectable()
export class ModuloService {
  constructor() {}

  async cadastrar(modulo: Modulo) {
    return modulo;
  }
}