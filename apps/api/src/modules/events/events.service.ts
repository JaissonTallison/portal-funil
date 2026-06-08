import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { category?: string; limit?: number; offset?: number } = {}) {
    const where = params.category ? { category: params.category } : {};
    const [items, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        orderBy: { startDate: 'asc' },
        take: params.limit ?? 20,
        skip: params.offset ?? 0,
      }),
      this.prisma.event.count({ where }),
    ]);
    return { items, total, limit: params.limit ?? 20, offset: params.offset ?? 0 };
  }

  async findById(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException(`Evento não encontrado`);
    return event;
  }

  async findBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({ where: { slug } });
    if (!event) throw new NotFoundException(`Evento "${slug}" não encontrado`);
    return event;
  }

  async findHighlighted() {
    return this.prisma.event.findFirst({
      where: { isHighlighted: true },
      orderBy: { startDate: 'asc' },
    });
  }

  async findUpcoming(limit = 6) {
    return this.prisma.event.findMany({
      where: { startDate: { gte: new Date() } },
      orderBy: { startDate: 'asc' },
      take: limit,
    });
  }

  async findRelated(slug: string, category: string, limit = 3) {
    return this.prisma.event.findMany({
      where: { category, slug: { not: slug } },
      orderBy: { startDate: 'asc' },
      take: limit,
    });
  }

  private buildSlug(title: string) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        slug: this.buildSlug(dto.title),
        title: dto.title,
        description: dto.description,
        category: dto.category,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        time: dto.time,
        venue: dto.venue,
        neighborhood: dto.neighborhood,
        address: dto.address,
        price: dto.price,
        isFree: dto.isFree,
        image: dto.image,
        ageRating: dto.ageRating,
        organizer: dto.organizer,
        isHighlighted: dto.isHighlighted ?? false,
        isSponsored: dto.isSponsored ?? false,
        sponsor: dto.sponsor,
        tags: dto.tags ?? [],
      },
    });
  }

  async update(id: string, dto: UpdateEventDto) {
    await this.findById(id);
    const data: Record<string, unknown> = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    if (dto.title) data.slug = this.buildSlug(dto.title);
    return this.prisma.event.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.event.delete({ where: { id } });
    return { message: 'Evento excluído com sucesso' };
  }
}
