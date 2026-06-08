import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';

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
      select: { ...ARTICLE_SELECT, content: true },
    });
    if (!article) throw new NotFoundException(`Artigo "${slug}" não encontrado`);

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

  async create(dto: CreateArticleDto, authorId: string) {
    const slug = dto.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

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
}
