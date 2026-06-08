import { Controller, Post, Get, Patch, Body, Param, Query, Request } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportStatusDto } from './dto/update-report-status.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

type AuthRequest = { user: { id: string; role: Role } };

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateReportDto) {
    return this.reportsService.create(dto);
  }

  @Public()
  @Get('status/:protocol')
  findByProtocol(@Param('protocol') protocol: string) {
    return this.reportsService.findByProtocol(protocol);
  }

  @Get('admin')
  @Roles(Role.ADMIN, Role.EDITOR)
  findAllAdmin(
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.reportsService.findAllAdmin({
      status,
      type,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }

  @Get('admin/:id')
  @Roles(Role.ADMIN, Role.EDITOR)
  findOneAdmin(@Param('id') id: string) {
    return this.reportsService.findOneAdmin(id);
  }

  @Patch('admin/:id/status')
  @Roles(Role.ADMIN, Role.EDITOR)
  changeStatus(
    @Param('id') id: string,
    @Body() dto: UpdateReportStatusDto,
    @Request() req: AuthRequest,
  ) {
    return this.reportsService.changeStatus(id, dto, req.user.id);
  }
}
