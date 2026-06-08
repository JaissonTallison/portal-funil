import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum AdminReportStatus {
  RECEIVED    = 'RECEIVED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  VERIFIED    = 'VERIFIED',
  PUBLISHED   = 'PUBLISHED',
  CLOSED      = 'CLOSED',
  REJECTED    = 'REJECTED',
}

export class UpdateReportStatusDto {
  @IsEnum(AdminReportStatus)
  status: AdminReportStatus;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;
}
