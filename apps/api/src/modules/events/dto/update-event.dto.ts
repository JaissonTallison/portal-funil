import { IsString, IsBoolean, IsOptional, IsDateString, IsArray } from 'class-validator';

export class UpdateEventDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsOptional() @IsString() time?: string;
  @IsOptional() @IsString() venue?: string;
  @IsOptional() @IsString() neighborhood?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() price?: string;
  @IsOptional() @IsBoolean() isFree?: boolean;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() ageRating?: string;
  @IsOptional() @IsString() organizer?: string;
  @IsOptional() @IsBoolean() isHighlighted?: boolean;
  @IsOptional() @IsBoolean() isSponsored?: boolean;
  @IsOptional() @IsString() sponsor?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
}
