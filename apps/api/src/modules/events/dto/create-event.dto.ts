import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsDateString, IsArray } from 'class-validator';

export class CreateEventDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() description: string;
  @IsString() @IsNotEmpty() category: string;
  @IsDateString() startDate: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsOptional() @IsString() time?: string;
  @IsString() @IsNotEmpty() venue: string;
  @IsOptional() @IsString() neighborhood?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() price?: string;
  @IsBoolean() isFree: boolean;
  @IsString() @IsNotEmpty() image: string;
  @IsOptional() @IsString() ageRating?: string;
  @IsOptional() @IsString() organizer?: string;
  @IsOptional() @IsBoolean() isHighlighted?: boolean;
  @IsOptional() @IsBoolean() isSponsored?: boolean;
  @IsOptional() @IsString() sponsor?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
}
