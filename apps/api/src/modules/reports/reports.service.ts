import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportStatusDto } from './dto/update-report-status.dto';

function generateProtocol(count: number): string {
  const year = new Date().getFullYear();
  const seq = String(count + 1).padStart(4, '0');
  return `PF-${year}-${seq}`;
}

const REPORT_SELECT = {
  id: true, protocol: true, type: true, status: true,
  name: true, phone: true, email: true, location: true, description: true,
  notes: true, createdAt: true, updatedAt: true,
  assignedTo: { select: { id: true, name: true, email: true } },
} as const;

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReportDto) {
    const count = await this.prisma.report.count();
    const protocol = generateProtocol(count);

    return this.prisma.report.create({
      data: { ...dto, protocol },
      select: { id: true, protocol: true, type: true, status: true, createdAt: true },
    });
  }

  async findByProtocol(protocol: string) {
    const report = await this.prisma.report.findUnique({
      where: { protocol: protocol.toUpperCase() },
      select: { id: true, protocol: true, type: true, status: true, createdAt: true, updatedAt: true },
    });
    if (!report) throw new NotFoundException('Protocolo não encontrado');
    return report;
  }

  async findAllAdmin(params: { status?: string; type?: string; limit?: number; offset?: number } = {}) {
    const where: Record<string, unknown> = {};
    if (params.status) where.status = params.status;
    if (params.type) where.type = params.type;

    const [items, total] = await Promise.all([
      this.prisma.report.findMany({
        where,
        select: REPORT_SELECT,
        orderBy: { createdAt: 'desc' },
        take: params.limit ?? 50,
        skip: params.offset ?? 0,
      }),
      this.prisma.report.count({ where }),
    ]);

    return { items, total, limit: params.limit ?? 50, offset: params.offset ?? 0 };
  }

  async findOneAdmin(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      select: {
        ...REPORT_SELECT,
        history: {
          select: {
            id: true, fromStatus: true, toStatus: true, notes: true, userId: true, createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!report) throw new NotFoundException('Denúncia não encontrada');
    return report;
  }

  async changeStatus(id: string, dto: UpdateReportStatusDto, adminId: string) {
    const report = await this.prisma.report.findUnique({ where: { id }, select: { id: true, status: true } });
    if (!report) throw new NotFoundException('Denúncia não encontrada');

    const [updated] = await this.prisma.$transaction([
      this.prisma.report.update({
        where: { id },
        data: {
          status: dto.status as never,
          notes: dto.notes,
          ...(dto.assignedToId ? { assignedToId: dto.assignedToId } : {}),
        },
        select: REPORT_SELECT,
      }),
      this.prisma.reportHistory.create({
        data: {
          reportId: id,
          fromStatus: report.status as never,
          toStatus: dto.status as never,
          notes: dto.notes,
          userId: adminId,
        },
      }),
    ]);

    return updated;
  }
}
