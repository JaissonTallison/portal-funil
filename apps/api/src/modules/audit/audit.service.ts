import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

export interface LogParams {
  userId?: string;
  userEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Prisma.InputJsonObject;
  ip?: string;
}

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  log(params: LogParams): void {
    const { userId, ...rest } = params;
    this.prisma.auditLog.create({
      data: {
        ...rest,
        ...(userId ? { user: { connect: { id: userId } } } : {}),
      },
    }).catch(() => {});
  }

  async findAll(params: { userId?: string; entity?: string; limit?: number; offset?: number } = {}) {
    const where: Record<string, unknown> = {};
    if (params.userId) where.userId = params.userId;
    if (params.entity) where.entity = params.entity;

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        select: {
          id: true, action: true, entity: true, entityId: true,
          details: true, ip: true, createdAt: true, userEmail: true,
          user: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: params.limit ?? 50,
        skip: params.offset ?? 0,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return { items, total, limit: params.limit ?? 50, offset: params.offset ?? 0 };
  }
}
