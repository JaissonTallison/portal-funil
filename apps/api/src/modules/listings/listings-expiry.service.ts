import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

const INTERVAL_MS = 60 * 60 * 1000; // 1 hora

@Injectable()
export class ListingsExpiryService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ListingsExpiryService.name);

  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  onApplicationBootstrap() {
    this.runExpiry().catch(() => {});
    setInterval(() => this.runExpiry().catch(() => {}), INTERVAL_MS);
    this.logger.log('Expiração automática de classificados iniciada (intervalo: 1h)');
  }

  async runExpiry(): Promise<number> {
    const now = new Date();

    const expired = await this.prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        expiresAt: { lt: now, not: null },
      },
      select: { id: true },
    });

    if (expired.length === 0) return 0;

    await this.prisma.listing.updateMany({
      where: { id: { in: expired.map((l) => l.id) } },
      data: { status: 'EXPIRED' },
    });

    for (const listing of expired) {
      this.auditService.log({
        userEmail: 'system',
        action: 'STATUS_CHANGE',
        entity: 'Listing',
        entityId: listing.id,
        details: { from: 'ACTIVE', to: 'EXPIRED', reason: 'expiresAt exceeded' },
      });
    }

    this.logger.log(`${expired.length} classificado(s) expirado(s) automaticamente`);
    return expired.length;
  }
}
