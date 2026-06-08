import { IsOptional, IsEnum, IsString, IsNumber, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum ListingStatusDto {
  PENDING  = 'PENDING',
  ACTIVE   = 'ACTIVE',
  REFUSED  = 'REFUSED',
  EXPIRED  = 'EXPIRED',
  PAUSED   = 'PAUSED',
}

class UpdateContactDto {
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() email?: string;
  @IsString() @IsOptional() whatsapp?: string;
  @IsString() @IsOptional() location?: string;
}

export class UpdateListingDto {
  @IsString() @IsOptional() title?: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() category?: string;
  @IsString() @IsOptional() type?: string;
  @IsNumber() @IsOptional() @Min(0) price?: number | null;
  @IsArray() @IsString({ each: true }) @IsOptional() images?: string[];
  @IsEnum(ListingStatusDto) @IsOptional() status?: ListingStatusDto;

  @ValidateNested() @Type(() => UpdateContactDto) @IsOptional()
  contact?: UpdateContactDto;
}
