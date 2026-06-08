import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Public()
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.eventsService.findAll({
      category,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  @Public()
  @Get('highlighted')
  findHighlighted() {
    return this.eventsService.findHighlighted();
  }

  @Public()
  @Get('upcoming')
  findUpcoming(@Query('limit') limit?: string) {
    return this.eventsService.findUpcoming(limit ? parseInt(limit) : 6);
  }

  @Public()
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  @Public()
  @Get(':slug/related')
  findRelated(
    @Param('slug') slug: string,
    @Query('category') category: string,
  ) {
    return this.eventsService.findRelated(slug, category);
  }

  @Post()
  @Roles(Role.ADMIN, Role.EDITOR)
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EDITOR)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
