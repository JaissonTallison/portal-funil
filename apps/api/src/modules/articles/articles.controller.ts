import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

type AuthRequest = { user: { id: string; role: Role } };

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

  @Get('admin/all')
  @Roles(Role.ADMIN, Role.EDITOR, Role.JOURNALIST)
  findAllAdmin(
    @Request() req: AuthRequest,
    @Query('status') status?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.articlesService.findAllAdmin({
      status,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      requesterId: req.user.id,
      requesterRole: req.user.role,
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
  @Get('live')
  findLive() {
    return this.articlesService.findLive();
  }

  @Public()
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @Post()
  @Roles(Role.ADMIN, Role.EDITOR, Role.JOURNALIST)
  create(@Body() dto: CreateArticleDto, @Request() req: AuthRequest) {
    return this.articlesService.create(dto, req.user.id);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.EDITOR, Role.JOURNALIST)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto,
    @Request() req: AuthRequest,
  ) {
    return this.articlesService.update(id, dto, req.user.id, req.user.role);
  }

  @Patch(':id/publish')
  @Roles(Role.ADMIN, Role.EDITOR)
  publish(@Param('id') id: string) {
    return this.articlesService.publish(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
