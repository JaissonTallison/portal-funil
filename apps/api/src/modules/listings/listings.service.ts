import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

const LISTING_SELECT = {
  id: true, title: true, description: true, category: true, type: true,
  price: true, images: true, status: true, views: true, isFeatured: true,
  expiresAt: true, createdAt: true, updatedAt: true,
  contact: { select: { name: true, phone: true, email: true, whatsapp: true, location: true } },
  user: { select: { id: true, name: true } },
} as const;

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { category?: string; type?: string; limit?: number; offset?: number } = {}) {
    const where = {
      status: 'ACTIVE' as const,
      ...(params.category ? { category: params.category } : {}),
      ...(params.type ? { type: params.type as never } : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        select: LISTING_SELECT,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        take: params.limit ?? 20,
        skip: params.offset ?? 0,
      }),
      this.prisma.listing.count({ where }),
    ]);
    return { items, total, limit: params.limit ?? 20, offset: params.offset ?? 0 };
  }

  async findById(id: string) {
    const listing = await this.prisma.listing.findUnique({ where: { id }, select: LISTING_SELECT });
    if (!listing) throw new NotFoundException('Anúncio não encontrado');
    return listing;
  }

  async findByUser(userId: string) {
    return this.prisma.listing.findMany({
      where: { userId },
      select: LISTING_SELECT,
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateListingDto, userId: string) {
    return this.prisma.listing.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        type: dto.type as never,
        price: dto.price ?? null,
        images: dto.images ?? [],
        userId,
        contact: { create: dto.contact },
      },
      select: LISTING_SELECT,
    });
  }

  async update(id: string, dto: UpdateListingDto, requesterId: string, requesterRole: Role) {
    const listing = await this.findById(id);
    if (requesterRole !== Role.ADMIN && listing.user.id !== requesterId) {
      throw new ForbiddenException('Você só pode editar seus próprios anúncios');
    }

    const { contact, type, ...rest } = dto;

    return this.prisma.listing.update({
      where: { id },
      data: {
        ...rest,
        ...(type ? { type: type as never } : {}),
        ...(contact ? { contact: { update: contact } } : {}),
      },
      select: LISTING_SELECT,
    });
  }

  async remove(id: string, requesterId: string, requesterRole: Role) {
    const listing = await this.findById(id);
    if (requesterRole !== Role.ADMIN && listing.user.id !== requesterId) {
      throw new ForbiddenException('Você só pode excluir seus próprios anúncios');
    }
    await this.prisma.listing.delete({ where: { id } });
    return { message: 'Anúncio excluído' };
  }

  async incrementViews(id: string) {
    await this.prisma.listing.update({ where: { id }, data: { views: { increment: 1 } } });
  }
}
