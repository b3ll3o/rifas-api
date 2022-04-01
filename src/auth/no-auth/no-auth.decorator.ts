import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { IS_NO_AUTH_KEY } from './no-auth';

export const NoAuth = () =>
  SetMetadata(IS_NO_AUTH_KEY, true)
