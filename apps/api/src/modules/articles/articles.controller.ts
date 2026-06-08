import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Public()
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.articlesService.findAll({
      category,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  @Public()
  @Get('featured')
  findFeatured() {
    return this.articlesService.findFeatured();
  }

  @Public()
  @Get('most-read')
  findMostRead(@Query('limit') limit?: string) {
    return this.articlesService.findMostRead(limit ? parseInt(limit) : 5);
  }

  @Public()
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @Post()
  create(@Body() dto: CreateArticleDto, @Request() req: { user: { id: string } }) {
    return this.articlesService.create(dto, req.user.id);
  }
}
