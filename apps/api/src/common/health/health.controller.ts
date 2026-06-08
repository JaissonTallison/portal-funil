import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../decorators/public.decorator';

const START_TIME = Date.now();
const VERSION = process.env.npm_package_version ?? '1.1.0';

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

    const uptimeSeconds = Math.floor((Date.now() - START_TIME) / 1000);

    return {
      status: db ? 'ok' : 'degraded',
      version: VERSION,
      uptime: uptimeSeconds,
      timestamp: new Date().toISOString(),
      services: {
        database: db ? 'up' : 'down',
        redis: 'not_configured',
        api: 'up',
      },
    };
  }
}
