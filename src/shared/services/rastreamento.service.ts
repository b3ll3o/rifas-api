import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../../usuarios/domain/services/usuarios.service';
import { Rastreamento } from '../rastreamento';

@Injectable()
export class RastreamentoService<T> {
  constructor(private readonly usuarioService: UsuariosService) {}

  async adicionaRastreioInclusao(
    usuarioId: number,
    rastreamento: T & Rastreamento<T>,
  ): Promise<T> {
    const usuario = await this.usuarioService.buscaUsuarioPorId(usuarioId);
    rastreamento.criadoEm = new Date();
    rastreamento.criadoPor = usuario;
    return rastreamento;
  }
}
