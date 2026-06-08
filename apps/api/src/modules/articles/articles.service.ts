import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaClient, Prisma, Role } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

const ARTICLE_SELECT = {
  id: true,
  slug: true,
  title: true,
  description: true,
  image: true,
  status: true,
  publishedAt: true,
  readTime: true,
  views: true,
  isLive: true,
  isFeatured: true,
  isSponsored: true,
  sponsor: true,
  author: { select: { id: true, name: true, avatar: true } },
  category: { select: { id: true, slug: true, name: true } },
} as const;

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  // ─── Slug helpers ───────────────────────────────────────────────────────────

  private buildBaseSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private async uniqueSlug(base: string, excludeId?: string): Promise<string> {
    let candidate = base;
    let counter = 1;

    while (true) {
      const existing = await this.prisma.article.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });

      if (!existing || existing.id === excludeId) return candidate;

      counter += 1;
      candidate = `${base}-${counter}`;
    }
  }

  // ─── Queries públicas ────────────────────────────────────────────────────────

  async findAll(params: { category?: string; limit?: number; offset?: number } = {}) {
    const where = {
      status: 'PUBLISHED' as const,
      ...(params.category ? { category: { slug: params.category } } : {}),
    };
    const [items, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        select: ARTICLE_SELECT,
        orderBy: { publishedAt: 'desc' },
        take: params.limit ?? 20,
        skip: params.offset ?? 0,
      }),
      this.prisma.article.count({ where }),
    ]);
    return { items, total, limit: params.limit ?? 20, offset: params.offset ?? 0 };
  }

  async findBySlug(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: { slug },
      select: { ...ARTICLE_SELECT, content: true, status: true },
    });

    // BUG-02 fix: artigos não publicados são invisíveis na rota pública
    if (!article || article.status !== 'PUBLISHED') {
      throw new NotFoundException(`Artigo "${slug}" não encontrado`);
    }

    await this.prisma.article.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return article;
  }

  async findFeatured() {
    return this.prisma.article.findMany({
      where: { status: 'PUBLISHED', isFeatured: true },
      select: ARTICLE_SELECT,
      orderBy: { publishedAt: 'desc' },
      take: 5,
    });
  }

  async findMostRead(limit = 5) {
    return this.prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      select: ARTICLE_SELECT,
      orderBy: { views: 'desc' },
      take: limit,
    });
  }

  async findLive() {
    return this.prisma.article.findMany({
      where: { status: 'PUBLISHED', isLive: true },
      select: ARTICLE_SELECT,
      orderBy: { publishedAt: 'desc' },
    });
  }

  // ─── Queries de admin ────────────────────────────────────────────────────────

  async findAllAdmin(params: {
    status?: string;
    limit?: number;
    offset?: number;
    requesterId: string;
    requesterRole: Role;
  }) {
    // BUG-03 fix: JOURNALIST só vê seus próprios artigos
    const authorFilter =
      params.requesterRole === Role.JOURNALIST
        ? { authorId: params.requesterId }
        : {};

    const statusFilter = params.status ? { status: params.status as never } : {};
    const where = { ...statusFilter, ...authorFilter };

    const [items, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        select: { ...ARTICLE_SELECT, createdAt: true, updatedAt: true },
        orderBy: { createdAt: 'desc' },
        take: params.limit ?? 50,
        skip: params.offset ?? 0,
      }),
      this.prisma.article.count({ where }),
    ]);
    return { items, total, limit: params.limit ?? 50, offset: params.offset ?? 0 };
  }

  async findById(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select: { ...ARTICLE_SELECT, content: true, authorId: true },
    });
    if (!article) throw new NotFoundException(`Artigo não encontrado`);
    return article;
  }

  // ─── Mutações ────────────────────────────────────────────────────────────────

  async create(dto: CreateArticleDto, authorId: string) {
    const base = this.buildBaseSlug(dto.title);
    const slug = await this.uniqueSlug(base);

    return this.prisma.article.create({
      data: {
        slug,
        title: dto.title,
        description: dto.description,
        content: dto.content,
        image: dto.image,
        readTime: dto.readTime,
        isLive: dto.isLive ?? false,
        isFeatured: dto.isFeatured ?? false,
        isSponsored: dto.isSponsored ?? false,
        sponsor: dto.sponsor,
        authorId,
        categoryId: dto.categoryId,
      },
      select: ARTICLE_SELECT,
    });
  }

  async update(
    id: string,
    dto: UpdateArticleDto,
    requesterId: string,
    requesterRole: Role,
  ) {
    const article = await this.findById(id);

    if (requesterRole === Role.JOURNALIST && article.authorId !== requesterId) {
      throw new ForbiddenException('Jornalistas só podem editar seus próprios artigos');
    }

    const data: Record<string, unknown> = { ...dto };

    if (dto.title) {
      const base = this.buildBaseSlug(dto.title);
      data.slug = await this.uniqueSlug(base, id);
    }

    if (dto.status === 'PUBLISHED' && !article.publishedAt) {
      data.publishedAt = new Date();
    }

    return this.prisma.article.update({
      where: { id },
      data,
      select: ARTICLE_SELECT,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.article.delete({ where: { id } });
    return { message: 'Artigo excluído com sucesso' };
  }

  async publish(id: string) {
    await this.findById(id);
    return this.prisma.article.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
      select: ARTICLE_SELECT,
    });
  }

  async changeStatus(
    id: string,
    newStatus: string,
    requesterId: string,
    requesterRole: Role,
  ) {
    const article = await this.findById(id);

    const TRANSITIONS: Record<Role, Partial<Record<string, string[]>>> = {
      [Role.JOURNALIST]: { DRAFT: ['REVIEW'] },
      [Role.EDITOR]: { REVIEW: ['PUBLISHED', 'DRAFT'], PUBLISHED: ['ARCHIVED'] },
      [Role.ADMIN]: {
        DRAFT: ['REVIEW', 'PUBLISHED', 'ARCHIVED'],
        REVIEW: ['PUBLISHED', 'DRAFT', 'ARCHIVED'],
        PUBLISHED: ['ARCHIVED', 'DRAFT'],
        ARCHIVED: ['DRAFT', 'PUBLISHED'],
      },
      [Role.READER]: {},
    };

    if (requesterRole === Role.JOURNALIST && article.authorId !== requesterId) {
      throw new ForbiddenException('Jornalistas só podem alterar o status de seus próprios artigos');
    }

    const allowed = TRANSITIONS[requesterRole]?.[article.status] ?? [];
    if (!allowed.includes(newStatus)) {
      throw new ForbiddenException(
        `Transição ${article.status} → ${newStatus} não permitida para ${requesterRole}`,
      );
    }

    const data: Record<string, unknown> = { status: newStatus };
    if (newStatus === 'PUBLISHED' && !article.publishedAt) {
      data.publishedAt = new Date();
    }

    return this.prisma.article.update({
      where: { id },
      data,
      select: ARTICLE_SELECT,
    });
  }
}
