import { Controller, Get, Query } from '@nestjs/common';
import { AuditService } from './audit.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('audit')
@Roles(Role.ADMIN)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get('logs')
  findAll(
    @Query('userId') userId?: string,
    @Query('entity') entity?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.auditService.findAll({
      userId,
      entity,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });
  }
}
