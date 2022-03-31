import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { IS_NO_AUTH_KEY } from '../no-auth/no-auth';
import { LocalAuthGuard } from './local-auth.guard';

export const LocalAuth = () =>
  applyDecorators(SetMetadata(IS_NO_AUTH_KEY, true), UseGuards(LocalAuthGuard));
