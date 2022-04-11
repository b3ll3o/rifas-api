import { Injectable } from '@nestjs/common';
import { PermissaoService } from '../../domain/services/permissao.service';

@Injectable()
export class PermissaoApplicationService {
  constructor(private readonly permissaoService: PermissaoService) {}
}
