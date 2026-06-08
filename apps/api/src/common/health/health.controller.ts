import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Public()
  @Get()
  async check() {
    let db = false;
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      db = true;
    } catch {}

    return {
      status: db ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      services: { database: db ? 'up' : 'down' },
    };
  }
}
