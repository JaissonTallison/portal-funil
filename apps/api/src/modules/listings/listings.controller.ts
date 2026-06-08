import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, Request,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { ListingsService } from './listings.service';
import { ListingsExpiryService } from './listings-expiry.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

type AuthRequest = { user: { id: string; role: Role } };

@Controller('listings')
export class ListingsController {
  constructor(
    private listingsService: ListingsService,
    private listingsExpiryService: ListingsExpiryService,
  ) {}

  @Public()
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('type') type?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.listingsService.findAll({
      category, type,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string) {
    const listing = await this.listingsService.findById(id);
    this.listingsService.incrementViews(id).catch(() => {});
    return listing;
  }

  @Get('user/mine')
  @Roles(Role.ADMIN, Role.EDITOR, Role.JOURNALIST, Role.READER)
  findMine(@Request() req: AuthRequest) {
    return this.listingsService.findByUser(req.user.id);
  }

  @Post()
  @Roles(Role.ADMIN, Role.EDITOR, Role.JOURNALIST, Role.READER)
  create(@Body() dto: CreateListingDto, @Request() req: AuthRequest) {
    return this.listingsService.create(dto, req.user.id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.EDITOR, Role.JOURNALIST, Role.READER)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateListingDto,
    @Request() req: AuthRequest,
  ) {
    return this.listingsService.update(id, dto, req.user.id, req.user.role);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EDITOR, Role.JOURNALIST, Role.READER)
  remove(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.listingsService.remove(id, req.user.id, req.user.role);
  }

  @Post('admin/run-expiry')
  @Roles(Role.ADMIN)
  async runExpiry() {
    const count = await this.listingsExpiryService.runExpiry();
    return { expired: count, message: `${count} classificado(s) expirado(s)` };
  }
}
