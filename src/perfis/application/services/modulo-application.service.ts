import { Injectable } from '@nestjs/common';
import { ModuloService } from '../../domain/services/modulo.service';

@Injectable()
export class ModuloApplicationService {
  constructor(private readonly moduloService: ModuloService) {}
}
