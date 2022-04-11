import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../../usuarios/domain/services/usuarios.service';
import { Rastreamento } from '../rastreamento';
import { DataService } from './data.service';

@Injectable()
export class RastreamentoService<T> {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly dataService: DataService,
  ) {}

  async adicionaRastreioInclusao(
    usuarioId: number,
    rastreamento: T & Rastreamento<T>,
  ): Promise<T> {
    const usuario = await this.usuarioService.buscaUsuarioPorId(usuarioId);
    rastreamento.criadoEm = this.dataService.getDataAtual();
    rastreamento.criadoPor = usuario;
    return rastreamento;
  }
}
