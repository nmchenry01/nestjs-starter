import { CanActivate } from '@nestjs/common';

export const mockGuard: CanActivate = { canActivate: () => true };
