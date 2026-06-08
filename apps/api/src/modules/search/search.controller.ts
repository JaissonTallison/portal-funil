import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { PrismaService } from '../../common/prisma/prisma.service';

@Controller('search')
export class SearchController {
  constructor(private prisma: PrismaService) {}

  @Public()
  @Get()
  async search(
    @Query('q') q = '',
    @Query('type') type?: string,
  ) {
    if (!q || q.trim().length < 2) {
      return { articles: [], events: [], listings: [], total: 0 };
    }

    const term = q.trim();

    const [articles, events, listings] = await Promise.all([
      !type || type === 'articles'
        ? this.prisma.article.findMany({
            where: {
              status: 'PUBLISHED',
              OR: [
                { title: { contains: term, mode: 'insensitive' } },
                { description: { contains: term, mode: 'insensitive' } },
              ],
            },
            select: {
              id: true, slug: true, title: true, description: true,
              image: true, publishedAt: true,
              category: { select: { name: true, slug: true } },
              author: { select: { name: true } },
            },
            orderBy: { publishedAt: 'desc' },
            take: 10,
          })
        : Promise.resolve([]),

      !type || type === 'events'
        ? this.prisma.event.findMany({
            where: {
              OR: [
                { title: { contains: term, mode: 'insensitive' } },
                { description: { contains: term, mode: 'insensitive' } },
                { venue: { contains: term, mode: 'insensitive' } },
              ],
            },
            select: {
              id: true, slug: true, title: true, description: true,
              image: true, startDate: true, venue: true, isFree: true, price: true,
            },
            orderBy: { startDate: 'asc' },
            take: 10,
          })
        : Promise.resolve([]),

      !type || type === 'listings'
        ? this.prisma.listing.findMany({
            where: {
              status: 'ACTIVE',
              OR: [
                { title: { contains: term, mode: 'insensitive' } },
                { description: { contains: term, mode: 'insensitive' } },
                { category: { contains: term, mode: 'insensitive' } },
              ],
            },
            select: {
              id: true, title: true, description: true, category: true,
              type: true, price: true, images: true,
              contact: { select: { location: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
          })
        : Promise.resolve([]),
    ]);

    return {
      articles,
      events,
      listings,
      total: articles.length + events.length + listings.length,
    };
  }
}
