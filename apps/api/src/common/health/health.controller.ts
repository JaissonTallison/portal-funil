import { Controller, Get } from '@nestjs/common';
import { createConnection } from 'net';
import { existsSync, statfsSync } from 'fs';
import { join } from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { Public } from '../decorators/public.decorator';

const START_TIME = Date.now();
const VERSION = process.env.npm_package_version ?? '1.1.1';

function checkRedis(): Promise<'up' | 'down'> {
  return new Promise((resolve) => {
    const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6380';
    const match = redisUrl.match(/redis:\/\/(?:[^@]+@)?([^:]+):(\d+)/);
    const host = match?.[1] ?? 'localhost';
    const port = Number(match?.[2] ?? 6380);

    const socket = createConnection({ host, port }, () => {
      socket.destroy();
      resolve('up');
    });
    socket.on('error', () => resolve('down'));
    socket.setTimeout(2000, () => { socket.destroy(); resolve('down'); });
  });
}

function getDiskInfo(): { totalGb: number; freeGb: number; usedPercent: number } | null {
  try {
    const stats = statfsSync('/');
    const total = stats.blocks * stats.bsize;
    const free = stats.bfree * stats.bsize;
    return {
      totalGb: Math.round(total / 1e9),
      freeGb: Math.round(free / 1e9),
      usedPercent: Math.round(((total - free) / total) * 100),
    };
  } catch {
    return null;
  }
}

function checkUploads(): 'ok' | 'missing' {
  const uploadsPath = join(process.cwd(), 'public', 'uploads');
  return existsSync(uploadsPath) ? 'ok' : 'missing';
}

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Public()
  @Get()
  async check() {
    const [dbOk, redisStatus] = await Promise.all([
      this.prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false),
      checkRedis(),
    ]);

    const disk = getDiskInfo();
    const uploads = checkUploads();
    const uptimeSeconds = Math.floor((Date.now() - START_TIME) / 1000);

    const diskWarning = disk ? disk.usedPercent >= 90 : false;
    const allOk = dbOk && !diskWarning && uploads === 'ok';

    return {
      status: allOk ? 'ok' : 'degraded',
      version: VERSION,
      uptime: uptimeSeconds,
      timestamp: new Date().toISOString(),
      services: {
        database: dbOk ? 'up' : 'down',
        redis: redisStatus,
        uploads,
        api: 'up',
      },
      disk: disk
        ? {
            totalGb: disk.totalGb,
            freeGb: disk.freeGb,
            usedPercent: disk.usedPercent,
            status: disk.usedPercent >= 90 ? 'critical' : disk.usedPercent >= 75 ? 'warning' : 'ok',
          }
        : null,
    };
  }
}
