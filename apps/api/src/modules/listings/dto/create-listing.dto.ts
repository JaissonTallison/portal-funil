import {
  IsString, IsNotEmpty, IsOptional, IsNumber, IsArray,
  IsEnum, ValidateNested, Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ContactDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() phone: string;
  @IsString() @IsNotEmpty() email: string;
  @IsString() @IsOptional() whatsapp?: string;
  @IsString() @IsNotEmpty() location: string;
}

export enum ListingTypeDto {
  SALE      = 'SALE',
  PURCHASE  = 'PURCHASE',
  SERVICE   = 'SERVICE',
  JOB       = 'JOB',
  OTHER     = 'OTHER',
}

export class CreateListingDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() description: string;
  @IsString() @IsNotEmpty() category: string;

  @IsEnum(ListingTypeDto)
  type: ListingTypeDto;

  @IsNumber() @IsOptional() @Min(0)
  price?: number;

  @IsArray() @IsString({ each: true }) @IsOptional()
  images?: string[];

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;
}
