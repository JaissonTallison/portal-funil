import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum ReportTypeDto {
  POLICIAL = 'POLICIAL',
  URBANO   = 'URBANO',
  PAUTA    = 'PAUTA',
  MIDIA    = 'MIDIA',
  ANONIMA  = 'ANONIMA',
}

export class CreateReportDto {
  @IsEnum(ReportTypeDto)
  type: ReportTypeDto;

  @IsString() @IsNotEmpty()
  description: string;

  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() email?: string;
  @IsString() @IsOptional() location?: string;
}
