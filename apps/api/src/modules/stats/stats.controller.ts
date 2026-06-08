import { Controller, Get } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

@Controller('stats')
@Roles(Role.ADMIN, Role.EDITOR, Role.JOURNALIST)
export class StatsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getStats() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const now = new Date();

    const [
      totalArticles, publishedArticles, draftArticles, reviewArticles,
      totalEvents, upcomingEvents,
      totalUsers,
      totalListings, activeListings, pendingListings,
      totalReports, pendingReports,
      todayPublished,
      recentArticles,
    ] = await Promise.all([
      this.prisma.article.count(),
      this.prisma.article.count({ where: { status: 'PUBLISHED' } }),
      this.prisma.article.count({ where: { status: 'DRAFT' } }),
      this.prisma.article.count({ where: { status: 'REVIEW' } }),
      this.prisma.event.count(),
      this.prisma.event.count({ where: { startDate: { gte: now } } }),
      this.prisma.user.count(),
      this.prisma.listing.count(),
      this.prisma.listing.count({ where: { status: 'ACTIVE' } }),
      this.prisma.listing.count({ where: { status: 'PENDING' } }),
      this.prisma.report.count(),
      this.prisma.report.count({ where: { status: { in: ['RECEIVED', 'UNDER_REVIEW'] as never[] } } }),
      this.prisma.article.count({
        where: { status: 'PUBLISHED', publishedAt: { gte: todayStart } },
      }),
      this.prisma.article.findMany({
        select: {
          id: true, title: true, slug: true, status: true,
          publishedAt: true, createdAt: true, views: true,
          author: { select: { name: true } },
          category: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    return {
      articles: { total: totalArticles, published: publishedArticles, draft: draftArticles, review: reviewArticles, todayPublished },
      events: { total: totalEvents, upcoming: upcomingEvents },
      users: { total: totalUsers },
      listings: { total: totalListings, active: activeListings, pending: pendingListings },
      reports: { total: totalReports, pending: pendingReports },
      recentArticles,
    };
  }
}
